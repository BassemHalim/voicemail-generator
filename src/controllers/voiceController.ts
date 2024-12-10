// src/controllers/voiceController.ts
import { Request, Response } from "express";
import voiceService from "../services/voiceService";

class VoiceController {
    async generateVoice(req: Request, res: Response): Promise<void> {
        try {
            const { message } = req.body;
            console.log(req.body);
            if (!message) {
                res.status(400).json({ error: "Message is required" });
                return;
            }
            if (message.length > 500) {
                res.status(400).json({
                    error: "Message should be shorter than 500 characters",
                });
            }
            const result = {
                id: "123-456",
                output: {
                    status: "RUNNING",
                    url: undefined,
                },
            };
            // const result = await voiceService.generateVoice(message);
            res.json(result);
        } catch (error) {
            if (error instanceof Error)
                res.status(500).json({ error: error.message });
        }
    }

    async checkStatus(req: Request, res: Response): Promise<void> {
        try {
            const { requestId } = req.params;
            const status = await voiceService.checkStatus(requestId);
            res.json({ status: status.output.status, url: status.output.url });
        } catch (error) {
            if (error instanceof Error)
                res.status(500).json({ error: error.message });
        }
    }

    async getDownloadUrl(req: Request, res: Response): Promise<void> {
        try {
            const { requestId } = req.params;
            const status = await voiceService.checkStatus(requestId);

            if (status.output.status !== "COMPLETED") {
                res.status(400).json({
                    error: "Audio generation not completed",
                });
                return;
            }

            if (!status.output.url) {
                res.status(400).json({ error: "Download URL not available" });
                return;
            }

            res.json({ downloadUrl: status.output.url });
        } catch (error) {
            if (error instanceof Error)
                res.status(500).json({ error: error.message });
        }
    }
}

export default new VoiceController();
