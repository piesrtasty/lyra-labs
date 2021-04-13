import session from "express-session";
import pg from "pg";
import pgSimple from "connect-pg-simple";
const PgStore = pgSimple(session);

const SESSION_SECRET = process.env.SESSION_SECRET;

const isDevelopment = process.env.NODE_ENV === "development";

const sessionStore = new PgStore({
  pool: new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: isDevelopment
      ? false
      : {
          rejectUnauthorized: false,
        },
  }),
  ttl: 30 * 24 * 60 * 60, // 30 days, in sec. Gets reset on each user visit
  disableTouch: false,
});

const sessionMiddleware = session({
  secret: SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false, // setting this to true results in 2 session objects, known issue with passport
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days, in ms
    // secure: false,
    sameSite: true,
  },
});

export default sessionMiddleware;
