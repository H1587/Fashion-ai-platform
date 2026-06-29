import { Request, Response } from "express";

export function getRoot(_req: Request, res: Response) {
    res.status(200).json({
        service: "Fashion AI API",
        status: "running",
        version: "0.1.0",
    });
}