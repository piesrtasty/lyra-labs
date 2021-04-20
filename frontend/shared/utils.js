import moment from "moment";
import uuidv4 from "uuid/v4";
import axios from "axios";
import { SIGN_UPLOAD } from "../data/mutations";
import get from "lodash/get";

const TODAY = "Today";
const YESTERDAY = "Yesterday";

const isToday = (date) => moment(date).isSame(moment(), "day");

const isYesterday = (date) =>
  moment(date).isSame(moment().subtract(1, "days"), "day");

export const formatDate = (date) => {
  if (isToday(date)) {
    return TODAY;
  }
  if (isYesterday(date)) {
    return YESTERDAY;
  }
  return moment(date).format("MMMM Do");
};

export const isValidUrl = (url) => {
  const pattern = new RegExp(
    "^((ft|htt)ps?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name and extension
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?" + // port
    "(\\/[-a-z\\d%@_.~+&:]*)*" + // path
    "(\\?[;&a-z\\d%@_.,~+&:=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return pattern.test(url);
};

export const checkIfAuthenticated = async (cookie = null) => {
  // console.log("----------CIA-------------");
  // console.log("process.env.VERCEL_URL", process.env.VERCEL_URL);
  // console.log("NEXT_PUBLIC_VERCEL_URL", process.env.NEXT_PUBLIC_VERCEL_URL);
  // console.log("-----------------------");
  const cookieObj = cookie ? { cookie } : {};
  const resp = await fetch(
    // `${process.env.FRONTEND_URL}/api/check-authentication`,
    `http://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/check-authentication`,
    {
      withCredentials: true,
      credentials: "include",
      headers: {
        ...cookieObj,
      },
    }
  );
  return resp.status === 200;
};
