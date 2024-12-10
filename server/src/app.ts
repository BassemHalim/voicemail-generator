import express from 'express';
import voiceController from './controllers/voiceController';
import config from './config/config';


const app = express();

app.use(express.json());

// Routes
app.post('/generate', voiceController.generateVoice);
app.get('/status/:requestId', voiceController.checkStatus);
app.get('/download/:requestId', voiceController.getDownloadUrl);

app.listen(config.port, () => {
    console.log(`Server running at http://localhost:${config.port}`);
});
