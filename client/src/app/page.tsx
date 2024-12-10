"use client";

import AudioPlayer from "@/components/AudioPlayer";
import { useState } from "react";

export default function Home() {
    const [message, setMessage] = useState("");
    const [audioUrl, setAudioUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message }),
            });

            const { id } = await response.json();

            // Poll for status
            const checkStatus = async () => {
                const statusResponse = await fetch(
                    `http://localhost:3000/status/${id}`
                );
                const statusData = await statusResponse.json();

                if (statusData.status === "COMPLETED") {
                    setAudioUrl(statusData.url);
                    setLoading(false);
                } else {
                    setTimeout(checkStatus, 1000);
                }
            };

            checkStatus();
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }
    };

    return (
        <main className="flex-1 container mx-auto p-4">
            <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto space-y-4"
            >
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={200}
                    placeholder="Enter your message here..."
                    className="w-full p-2 border rounded-lg h-32 text-black"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-800 text-white p-2 rounded-lg disabled:bg-gray-400 hover:bg-gray-600"
                >
                    {loading ? "Generating..." : "Generate Greeting"}
                </button>
            </form>

            {audioUrl && (
                <div className="max-w-lg mx-auto mt-8">
                    <AudioPlayer audioUrl={audioUrl} />
                </div>
            )}
        </main>
    );
}
