"use client";

import { useRef, useState } from "react";

interface AudioPlayerProps {
    audioUrl: string;
}

export default function AudioPlayer({ audioUrl }: AudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="p-2">
            <audio
                ref={audioRef}
                src={audioUrl}
                onTimeUpdate={() =>
                    setCurrentTime(audioRef.current?.currentTime || 0)
                }
                onLoadedMetadata={() =>
                    setDuration(audioRef.current?.duration || 0)
                }
            />
            <div className="flex gap-4 justify-center items-center">
                <button
                    onClick={togglePlay}
                    className="bg-gray-800 text-white hover:bg-gray-600 p-2 rounded-lg text-center mr-1"
                >
                    {isPlaying ? "⏸" : "▶"}
                </button>
                <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={(e) => {
                        if (audioRef.current) {
                            audioRef.current.currentTime = Number(
                                e.target.value
                            );
                        }
                    }}
                    className="w-full"
                />
            </div>
        </div>
    );
}
