# Video Streaming and Transcribing API

This API allows you to upload videos, stream them, extract audio, and transcribe the audio using OpenAI. It is built with Node.js, Express, MongoDB, and utilizes ffmpeg for video and audio processing.

## Table of Contents

- Prerequisites
- Installation
- Usage
- Endpoints
- Environment Variables
- Contributor
- License
- Documentation

1. Prerequisites:

```markdown
## Prerequisites

- Node.js and npm installed on your machine
- MongoDB set up and running
- OpenAI API key
```

## Installation

1. Clone the repository:

   ```bash
    git clone [<repository_url>](https://github.com/Vestertech/videoStreamingAPI)
    cd <repository_directory>
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

Create a .env file in the root directory and provide the following variables:

``````plaintext
PORT=XXXX
USER=XXXXXXXXX
DATABASE=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
DATABASE_PASSWORD=XXXXXXXXXXXXXXXX

OPENAI_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX


4. Run the application:

```bash
npm run start


## Usage

`````markdown

- **Uploading a Video:**

  Send a `POST` request to `/api/video/upload` with a video file as `multipart/form-data` named "video". The response will contain information about the uploaded video.

- **Getting a Video by ID:**

  Send a `GET` request to `/api/video/:videoId` to get information about a specific video by its ID.

- **Streaming a Video:**

  Send a `GET` request to `/api/video/stream/:videoId` to stream a specific video by its ID.

- **Transcribing Audio from a Video:**

  Send a `GET` request to `/api/video/transcribe/:videoId` to extract audio from a video, transcribe it, and get the transcript.

``````

## Endpoints

```markdown
## Endpoints

- `POST /api/video/upload`
- `GET /api/video/:videoId`
- `GET /api/video/stream/:videoId`
- `GET /api/video/transcribe/:videoId`
```

## Enviroment Variables:

```markdown
## Environment Variables

- `PORT`: Port on which the server will run.
- `USER`: MongoDB username.
- `DATABASE`: MongoDB database name.
- `DATABASE_PASSWORD`: MongoDB password.
- `OPENAI_API_KEY`: OpenAI API key.
```

## Contributor

1. Sylvester Eziagor

## License:

```markdown
This project is licensed under the [MIT License](LICENSE).
```

## DOCUMENTATION LINK HERE

Postman Documentation-(<https://documenter.getpostman.com/view/23083428/2s9YJbzMm1>)
