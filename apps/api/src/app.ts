import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./modules/auth/routes/auth.routes.js";
import projectRoutes from "./modules/projects/routes/project.routes.js";
import healthRoutes from "./routes/health.routes.js";

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);

app.use("/", healthRoutes);

export default app;