const https = require("https"); // or 'https' for https:// URLs
const fs = require("fs");

const API_KEY = process.env.PLAY_API_KEY;
const USER_ID = process.env.PLAY_USER_ID;
const message =
    "Hey There! I'm currently unavailable. Please leave your name, number, and message, and I'll return your call as soon as possible.";
async function generateVoice(message) {
    if (message.length > 500) {
        return "message too long";
    }
    body = {
        model: "Play3.0-mini",
        voice: "s3://voice-cloning-zero-shot/1bbc6986-fadf-4bd8-98aa-b86fed0476e9/original/manifest.json",
        quality: "medium",
        outputFormat: "wav",
        text: message,
    };
    const options = {
        method: "POST",
        headers: {
            AUTHORIZATION: API_KEY,
            "X-USER-ID": USER_ID,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    };

    fetch("https://api.play.ai/api/v1/tts", options)
        .then((response) => {
            if (!response.ok) {
                return Promise.reject(response);
            }
            return response.json();
        })
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((err) => console.error(err));
}

async function checkStatus(requestID) {
    const options = {
        method: "GET",
        headers: { AUTHORIZATION: API_KEY, "X-USER-ID": USER_ID },
    };

    return fetch("https://api.play.ai/api/v1/tts/" + requestID, options)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((err) => console.error(err));
}

async function downloadFile(url, outputPath) {
    const file = fs.createWriteStream(outputPath);
    const request = https.get(url, function (response) {
        response.pipe(file);

        // after download completed close filestream
        file.on("finish", () => {
            file.close();
            console.log("Download Completed");
        });
    });
}

(async () => {
    // console.log(requestVoice(message));
    // res = await checkStatus("36c60bd3-bf62-4438-8814-65f3c9634e0a");
    // console.log(res);
    // output = res.output;
    // if (res.output.status == "COMPLETED") {
    //     console.log(output.url);
    //     downloadFile(output.url, "samples/" + res.id + ".wav");
    // }
})();
