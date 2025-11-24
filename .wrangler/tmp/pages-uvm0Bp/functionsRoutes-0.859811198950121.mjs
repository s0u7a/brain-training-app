import { onRequest as __api_tts_js_onRequest } from "/home/souta-lab/.gemini/antigravity/brain/ab8bcd2f-736b-47cb-a431-0d8062baabd3/functions/api/tts.js"

export const routes = [
    {
      routePath: "/api/tts",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_tts_js_onRequest],
    },
  ]