import {
  objectType,
  idArg,
  intArg,
  stringArg,
  booleanArg,
} from "@nexus/schema";

export const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.avatar();
    t.model.username();
    t.model.headline();
    t.model.walletAddress();
    t.model.walletIsSetup();
    t.model.showOnboarding();
    t.model.name();
  },
});

export const Post = objectType({
  name: "Post",
  definition(t) {
    t.model.id();
    t.model.author();
    t.model.date();
    t.model.description();
    t.model.image();
    t.model.logo();
    t.model.publisher();
    t.model.title();
    t.model.url();
    t.model.archived();
    t.model.pinned();
    t.model.submitterId();
    t.model.submitter();
  },
});

export const Query = objectType({
  name: "Query",
  definition(t) {
    t.crud.posts({ pagination: true, ordering: true, filtering: true });
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
        const baseArgs = { take, ...where };
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
        const baseArgs = { take, ...where };
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
        // console.log("--->>>>>> FEED POSTTS", ctx.req);

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
          const baseArgs = { take, ...where };
          const args = cursor
            ? { ...baseArgs, skip: 1, cursor: { id: cursor } }
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
        console.log("--- calling the me resolver ---", ctx.req.user);
        // console.log("--- This is the me resolver ---", ctx.req.user);

        const currentUser = ctx.req.user ? ctx.req.user : null;
        return currentUser;
      },
    });
  },
});

export const Mutation = objectType({
  name: "Mutation",
  definition(t) {
    t.crud.createOneUser({ alias: "signupUser" });
    t.field("removePost", {
      type: "Post",
      args: {
        postId: idArg(),
      },
      resolve: async (_, { postId }, ctx) => {
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
        return await prisma.post.create({
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
        console.log("showOnboarding", showOnboarding);
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
