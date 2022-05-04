import express, { Express } from "express";
import { APP_URL, PORT, DBURL, CORS_ORIGINS } from "./config";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { router as favoriteRouter } from "./routes/favorite.router";
import { router as profileRouter } from "./routes/profile.router";
import { router as simulatorRouter } from "./routes/simulator.router";
import Log from "./resources/Log";

class Api {
  initDatabase () {
    if (process.env.NODE_ENV === "test") {
      return;
    }
    mongoose.connect(`${DBURL}`, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        Log.info(`Connected to DB ${DBURL}`);
      });
  }

  initServer () {
    const app = express();
    app.use(cors({ origin: CORS_ORIGINS }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(favoriteRouter);
    app.use(profileRouter);
    app.use(simulatorRouter);

    return app;
  }

  listen (server: Express) {
    if (process.env.NODE_ENV === "test") {
      return;
    }
    server.listen(PORT, () =>
      console.log(`✅  Ready on port ${APP_URL}:${PORT}`)
    );
  }
}

const api = new Api();
api.initDatabase();
export const server = api.initServer();
api.listen(server);
