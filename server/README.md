voicemail message generator:
- voices:
  - Male: Casper:
  ```
  s3://voice-cloning-zero-shot/1bbc6986-fadf-4bd8-98aa-b86fed0476e9/original/manifest.json
  ```
  - Female: Deedee: 
  ```
  s3://voice-cloning-zero-shot/e040bd1b-f190-4bdb-83f0-75ef85b18f84/original/manifest.json
  ```


# Voicemail message Generation API using PlayAI API 
This is a demo RESTful API service for generating voice messages using Play.ai's text-to-speech technology.

## API Endpoints

### Generate Voice Message
Converts text to speech and initiates the generation process.

```http
POST /generate
```

#### Request Body
| Parameter | Type | Description |
|-----------|------|-------------|
| message | string | Text to convert to speech (max 500 characters) |

#### Example Request
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, this is a test message"}' \
  http://localhost:3000/generate
```

#### Success Response
```json
{
  "id": "request-id-here",
  "output": {
    "status": "PROCESSING"
  }
}
```

#### Error Responses
- `400 Bad Request`: Message is missing or exceeds 500 characters
- `500 Internal Server Error`: Server-side error

### Check Generation Status
Checks the status of a voice generation request.

```http
GET /status/:requestId
```

#### Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| requestId | string | The ID received from the generate endpoint |

#### Example Request
```bash
curl http://localhost:3000/status/request-id-here
```

#### Success Response
```json
{
  "status": "COMPLETED",
  "url": "https://download-url-here"
}
```

#### Error Response
- `500 Internal Server Error`: Server-side error

### Get Download URL
Retrieves the download URL for a completed voice generation.

```http
GET /download/:requestId
```

#### Parameters
| Parameter | Type | Description |
|-----------|------|-------------|
| requestId | string | The ID received from the generate endpoint |

#### Example Request
```bash
curl http://localhost:3000/download/request-id-here
```

#### Success Response
```json
{
  "downloadUrl": "https://download-url-here"
}
```

#### Error Responses
- `400 Bad Request`: Audio generation not completed or URL not available
- `500 Internal Server Error`: Server-side error

## Error Handling

The API returns standard HTTP status codes and JSON error messages:

```json
{
  "error": "Error message description"
}
```

Common error scenarios:
- Missing or invalid message
- Message exceeds maximum length
- Generation not completed
- Download URL not available
- Server-side errors

## Environment Variables

The following environment variables are required:

```plaintext
API_KEY=your_play_ai_api_key
USER_ID=your_play_ai_user_id
PORT=3000 (optional, defaults to 3000)
```

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Create `.env` file with required environment variables

3. Start the server:
```bash
# Development
pnpm run dev

# Production
pnpm run build
pnpm start
```