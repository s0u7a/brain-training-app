# Brain Training App - Walkthrough

I have built a **Dual N-Back** brain training application using **Node.js**, **React (Vite)**, and **Bun**.
The app is configured for automatic deployment to **Cloudflare Pages**.

## Features
- **Dual N-Back Game**: A scientifically supported memory training task.
- **Premium Aesthetic**: Dark mode design with modern colors and fonts.
- **Audio Feedback**: Uses Google TTS via Cloudflare Pages Functions.

## How to Run Locally

I have unified the frontend and backend development into a single command using Wrangler (Cloudflare's CLI).

1.  **Install Dependencies**:
    ```bash
    bun install
    ```

2.  **Start the Development Server**:
    ```bash
    bun run pages:dev
    ```
    This will start the app at `http://localhost:8788` (default Wrangler port).
    It emulates the Cloudflare Pages environment, including the Functions for TTS.

## Deployment (Cloudflare Pages)

The app is set up to deploy automatically via **GitHub Actions**.

### Prerequisites
1.  A Cloudflare account.
2.  A GitHub repository.

### Setup Steps
1.  **Push** this code to your GitHub repository.
2.  **Get your Cloudflare Credentials**:
    - **Account ID**: Found in the Cloudflare Dashboard URL or sidebar.
    - **API Token**: Create a token with "Edit Cloudflare Pages" permissions.
3.  **Add Secrets to GitHub**:
    - Go to **Settings > Secrets and variables > Actions** in your repo.
    - Add `CLOUDFLARE_ACCOUNT_ID`.
    - Add `CLOUDFLARE_API_TOKEN`.
4.  **Trigger Deployment**:
    - Push a commit to `main`. The GitHub Action will build and deploy the app.

## Verification
- **Visuals**: Check if the grid highlights correctly.
- **Audio**: Ensure your volume is up. The app fetches audio from Google Translate's TTS via the `/api/tts` function.
