import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "node:path";

import authRoutes from "./modules/auth/routes/auth.routes.js";
import projectRoutes from "./modules/projects/routes/project.routes.js";
import uploadRoutes from "./modules/uploads/routes/upload.routes.js";
import aiRoutes from "./modules/ai/routes/ai.routes.js";
import productSpecificationRoutes from "./modules/product-specification/routes/product-specification.routes.js";
import healthRoutes from "./routes/health.routes.js";

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(
    "/uploads",
    express.static(path.resolve("uploads"))
);

app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/uploads", uploadRoutes);
app.use("/ai", aiRoutes);
app.use("/specifications", productSpecificationRoutes);

app.use("/", healthRoutes);

export default app;