import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

interface Config {
    apiKey: string;
    userId: string;
    port: number;
    voiceModel: string;
    voicePath: string;
    apiBaseUrl: string;
    outputDir: string;
}

const config: Config = {
    apiKey: process.env.PLAY_API_KEY || "key",
    userId: process.env.PLAY_USER_ID || "id",
    port: parseInt(process.env.PORT || "3000"),
    voiceModel: "Play3.0-mini",
    voicePath:
        "s3://voice-cloning-zero-shot/1bbc6986-fadf-4bd8-98aa-b86fed0476e9/original/manifest.json",
    apiBaseUrl: "https://api.play.ai/api/v1",
    outputDir: "samples",
};

export default config;
