# AI Voicemail Greeting Generator

This is a demo project that showcases the integration of AI text-to-speech technology for generating professional voicemail greetings. Simply type your desired greeting message, and the service converts it into a natural-sounding voice recording.

<img src="https://github.com/BassemHalim/voicemail-generator/blob/master/client.png?raw=true" width="500"  alt="client screenshot"/>

## Overview

This project consists of two main components:

-   A RESTful API backend built with Express.js
-   A modern frontend interface built with Next.js 14 (App Router)

## Features

-   Text-to-speech conversion using Play.ai API
-   Real-time generation status updates
-   Custom audio player interface
-   Mobile-responsive design
-   Simple and intuitive user interface

## Tech Stack

**Backend:**

-   Node.js
-   Express.js
-   Play.ai API integration
-   TypeScript

**Frontend:**

-   Next.js 14
-   React
-   TailwindCSS
-   TypeScript

## Getting Started

### Prerequisites

-   Node.js 18 or higher
-   pnpm package manager
-   Play.ai API credentials

### Backend Setup

1. Clone the repository
2. Navigate to the backend directory:

```bash
cd backend
pnpm install
```

3. Create a `.env` file:

```env
API_KEY=your_play_ai_api_key
USER_ID=your_play_ai_user_id
PORT=4000
```

4. Start the development server:

```bash
pnpm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
pnpm install
```

2. Start the development server:

```bash
pnpm run dev
```

## API Endpoints

-   `POST /generate` - Generate a new voicemail greeting
-   `GET /status/:requestId` - Check generation status
-   `GET /download/:requestId` - Get the download URL
