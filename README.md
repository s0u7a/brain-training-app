# Brain Training App

Dual N-Back brain training game built with React and Cloudflare Pages.

Match the current stimulus against the one shown N steps back — visual, audio, or both. Stats and history track your progress.

## Stack

- React 18 + Vite
- Express (local dev server)
- Cloudflare Pages / Workers (`functions/api/tts.js` — Google TTS proxy for voice cues)

## Getting Started

```bash
npm install
npm run dev      # local dev (requires Node 20+)
npm run build    # production build
npm start        # serve with Express
```

## Deploy (Cloudflare Pages)

```bash
npm run build
npx wrangler pages deploy dist
```

## License

MIT
