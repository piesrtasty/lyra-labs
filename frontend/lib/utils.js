import got from "got";

import metascraper from "metascraper";

import metascraperAuthor from "metascraper-author";
import metascraperDate from "metascraper-date";
import metascraperDescription from "metascraper-description";
import metascraperImage from "metascraper-image";
import metascraperLogo from "metascraper-logo";
import metascraperClearbit from "metascraper-clearbit";
import metascraperPublisher from "metascraper-publisher";
import metascraperTitle from "metascraper-title";
import metascraperUrl from "metascraper-url";

const ms = metascraper([
  metascraperAuthor(),
  metascraperDate(),
  metascraperDescription(),
  metascraperImage(),
  metascraperLogo(),
  metascraperClearbit(),
  metascraperPublisher(),
  metascraperTitle(),
  metascraperUrl(),
]);

import prisma from "./prisma";

export const saveUrl = async (givenUrl, currentUser) => {
  console.log("inside of saveUrl");
  const { body: html, url } = await got(givenUrl);
  console.log("html", html);
  console.log("url", url);
  const metadata = await ms({ html, url });
  console.log("metadata", metadata);
  return await prisma.post.create({
    data: {
      submitter: { connect: { id: currentUser.id } },
      ...metadata,
    },
  });
};
