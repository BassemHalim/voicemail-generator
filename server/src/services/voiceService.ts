import fs from "fs";
import https from "https";
import fetch from "node-fetch";
import config from "../config/config";
import { VoiceRequest, VoiceResponse } from "../types/voice";

class VoiceService {
    private readonly headers = {
        AUTHORIZATION: config.apiKey,
        "X-USER-ID": config.userId,
        "Content-Type": "application/json",
    };

    async generateVoice(message: string): Promise<VoiceResponse> {
        if (message.length > 500) {
            throw new Error("Message exceeds maximum length of 500 characters");
        }

        const body: VoiceRequest = {
            model: config.voiceModel,
            voice: config.voicePath,
            quality: "medium",
            outputFormat: "wav",
            text: message,
        };

        try {
            const response = await fetch(`${config.apiBaseUrl}/tts`, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(
                    `API request failed with status ${response.status}`
                );
            }

            return response.json() as Promise<VoiceResponse>;
        } catch (error) {
            if (error instanceof Error)
                throw new Error(`Failed to generate voice: ${error.message}`);
        }
        return Promise.reject();
    }

    async checkStatus(requestId: string): Promise<VoiceResponse> {
        
        try {
            const response = await fetch(
                `${config.apiBaseUrl}/tts/${requestId}`,
                {
                    method: "GET",
                    headers: this.headers,
                }
            );

            if (!response.ok) {
                throw new Error(
                    `API request failed with status ${response.status}`
                );
            }

            return response.json() as Promise<VoiceResponse>;
        } catch (error) {
            if (error instanceof Error)
                throw new Error(`Failed to check status: ${error.message}`);
        }
        return Promise.reject();
    }

    async downloadFile(url: string, requestId: string): Promise<string> {
        const outputPath = `${config.outputDir}/${requestId}.wav`;

        return new Promise((resolve, reject) => {
            if (!fs.existsSync(config.outputDir)) {
                fs.mkdirSync(config.outputDir, { recursive: true });
            }

            const file = fs.createWriteStream(outputPath);
            https
                .get(url, (response) => {
                    response.pipe(file);

                    file.on("finish", () => {
                        file.close();
                        resolve(outputPath);
                    });

                    file.on("error", (error) => {
                        fs.unlink(outputPath, () => reject(error));
                    });
                })
                .on("error", (error) => {
                    fs.unlink(outputPath, () => reject(error));
                });
        });
    }
}

export default new VoiceService();
