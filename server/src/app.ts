import cors from "cors";
import express from "express";
import config from "./config/config";
import voiceController from "./controllers/voiceController";
const app = express();
const corsOptions = {
    origin: ["localhost:31515"],
    methods: ["GET", "POST"],
};
app.use(cors());
app.use(express.json());
// Routes
app.post("/generate", voiceController.generateVoice);
app.get("/status/:requestId", voiceController.checkStatus);
app.get("/download/:requestId", voiceController.getDownloadUrl);

app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`);
});
