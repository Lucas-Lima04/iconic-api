import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import path from "path";

/*import { setupSwagger } from "./docs/swagger";
*/
import { errorHandler } from "./middlewares/errorHandler";

import { userRoutes } from "./routes";
import { postRoutes } from "./routes/posts.routes";
import { envs } from "./shared/envs";

dotenv.config();

const app = express();

//setupSwagger(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.get("/", (_req, res) => {
    return res.json({
        timestamp: new Date(),
    });
});


// app.use(rateLimiter);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use(errorHandler);

if (envs.nodeEnv === "development") {
    app.use(
        "/public/files",
        express.static(path.resolve(__dirname, "shared", "infra", "temp"))
    );
}

app.use("/public/static", express.static(path.resolve(__dirname, "public")));

export { app };
