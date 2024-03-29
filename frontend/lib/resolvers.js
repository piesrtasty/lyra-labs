import { objectType, idArg, intArg, stringArg, booleanArg } from "nexus";
import { User, Post } from "nexus-prisma";
import { saveUrl } from "./utils";

export const UserObjType = objectType({
  name: "User",
  definition(t) {
    t.field(User.id);
    t.field(User.email);
    t.field(User.avatar);
    t.field(User.username);
    t.field(User.headline);
    t.field(User.walletAddress);
    t.field(User.walletIsSetup);
    t.field(User.showOnboarding);
    t.field(User.name);
  },
});

export const PostObjType = objectType({
  name: "Post",
  definition(t) {
    t.field(Post.id);
    t.field(Post.author);
    t.field(Post.date);
    t.field(Post.description);
    t.field(Post.image);
    t.field(Post.logo);
    t.field(Post.publisher);
    t.field(Post.title);
    t.field(Post.url);
    t.field(Post.archived);
    t.field(Post.pinned);
    t.field(Post.submitterId);
    t.field(Post.submitter);
  },
});

export const Query = objectType({
  name: "Query",
  definition(t) {
    t.list.field("savedPosts", {
      type: "Post",
      args: {
        take: intArg(),
        cursor: idArg(),
      },
      resolve: async (_, { take = 10, cursor = null }, ctx) => {
        const currentUser = ctx.req.user;
        const where = currentUser
          ? { where: { submitterId: currentUser.id, archived: false } }
          : {};
        const baseArgs = {
          take,
          ...where,
          orderBy: {
            createdAt: "desc",
          },
        };
        const args = cursor
          ? { ...baseArgs, skip: 1, cursor: { id: cursor } }
          : baseArgs;
        const posts = await ctx.prisma.post.findMany(args);
        return posts;
      },
    });
    t.list.field("archivedPosts", {
      type: "Post",
      args: {
        take: intArg(),
        cursor: idArg(),
      },
      resolve: async (_, { take = 10, cursor = null }, ctx) => {
        const currentUser = ctx.req.user;
        const where = currentUser
          ? { where: { submitterId: currentUser.id, archived: true } }
          : {};
        const baseArgs = {
          take,
          ...where,
          orderBy: {
            createdAt: "desc",
          },
        };
        const args = cursor
          ? { ...baseArgs, skip: 1, cursor: { id: cursor } }
          : baseArgs;
        const posts = await ctx.prisma.post.findMany(args);
        return posts;
      },
    });
    t.list.field("feedPosts", {
      type: "Post",
      args: {
        take: intArg(),
        cursor: idArg(),
      },
      resolve: async (_, { take = 10, cursor = null }, ctx) => {
        const currentUser = ctx.req.user;
        if (currentUser) {
          const userSavedPosts = await ctx.prisma.post.findMany({
            where: { submitterId: currentUser.id },
            select: {
              url: true,
            },
          });
          const excludedUrls = userSavedPosts.map((p) => p.url);
          const where = currentUser
            ? {
                where: {
                  submitterId: { not: currentUser.id },
                  url: { notIn: excludedUrls },
                },
              }
            : {};
          const baseArgs = {
            take,
            ...where,
            orderBy: {
              createdAt: "desc",
            },
          };
          const args = cursor
            ? {
                ...baseArgs,
                skip: 1,
                cursor: { id: cursor },
              }
            : baseArgs;
          const posts = await ctx.prisma.post.findMany(args);
          return posts;
        } else {
          return await ctx.prisma.post.findMany({
            orderBy: {
              createdAt: "desc",
            },
          });
        }
      },
    });
    t.field("post", {
      type: "Post",
      args: {
        slug: stringArg(),
      },
      resolve: async (_, { slug }, ctx) => {
        const post = await ctx.prisma.post.findUnique({
          where: { slug },
        });
        return post;
      },
    });
    t.field("me", {
      type: "User",
      resolve: async (_, _args, ctx) => {
        const currentUser = ctx.req.user ? ctx.req.user : null;
        return currentUser;
      },
    });
  },
});

export const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    // t.crud.createOneUser({ alias: "signupUser" });
    t.field("removePost", {
      type: "Post",
      args: {
        postId: idArg(),
      },
      resolve: async (_, { postId }, ctx) => {
        console.log("----------------------");
        console.log("------ postId ----", postId);
        console.log("----------------------");
        return ctx.prisma.post.delete({
          where: {
            id: postId,
          },
        });
      },
    });
    t.field("restorePost", {
      type: "Post",
      args: {
        postId: idArg(),
      },
      resolve: async (_, { postId }, ctx) => {
        return await ctx.prisma.post.update({
          where: { id: postId },
          data: {
            archived: false,
          },
        });
      },
    });
    t.field("archivePost", {
      type: "Post",
      args: {
        postId: idArg(),
      },
      resolve: async (_, { postId }, ctx) => {
        return await ctx.prisma.post.update({
          where: { id: postId },
          data: {
            archived: true,
          },
        });
      },
    });

    t.field("saveExistingPost", {
      type: "Post",
      args: {
        postId: idArg(),
      },
      resolve: async (_, { postId }, ctx) => {
        const currentUser = ctx.req.user;
        const post = await ctx.prisma.post.findUnique({
          where: { id: postId },
        });
        const {
          author,
          date,
          description,
          image,
          logo,
          publisher,
          title,
          url,
        } = post;
        return await ctx.prisma.post.create({
          data: {
            submitter: { connect: { id: currentUser.id } },
            author,
            date,
            description,
            image,
            logo,
            publisher,
            title,
            url,
          },
        });
      },
    });
    t.field("updateUserOnboarding", {
      type: "User",
      args: {
        showOnboarding: booleanArg(),
      },
      resolve: async (_, { showOnboarding }, ctx) => {
        const currentUser = ctx.req.user;
        return await ctx.prisma.user.update({
          where: { id: currentUser.id },
          data: {
            showOnboarding,
          },
        });
      },
    });
    t.field("associateWallet", {
      type: "User",
      args: {
        address: stringArg(),
      },
      resolve: async (_, { address }, ctx) => {
        const currentUser = ctx.req.user;
        return await ctx.prisma.user.update({
          where: { id: currentUser.id },
          data: {
            walletAddress: address,
            walletIsSetup: true,
          },
        });
      },
    });

    t.field("createPost", {
      type: "Post",
      args: {
        givenUrl: stringArg(),
      },
      resolve: async (_, { givenUrl }, ctx) => {
        const currentUser = ctx.req.user;
        // const { walletIsSetup, walletAddress } = currentUser
        const response = await saveUrl(givenUrl, currentUser);
        // Send 1 token to user that created the post
        // if (walletIsSetup && walletAddress && process.env.FLOW_ENABLED) {
        //   FlowClient.mintAndSendTokens({
        //     quantity: 1,
        //     address: walletAddress,
        //   })
        // }
        return response;
      },
    });
  },
});
