export interface VoiceRequest {
    model: string;
    voice: string;
    quality: 'low' | 'medium' | 'high';
    outputFormat: string;
    text: string;
}

export interface VoiceResponse {
    id: string;
    output: {
        status: string;
        url?: string;
    };
}
