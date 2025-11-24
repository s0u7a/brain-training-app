export async function onRequest(context) {
    const url = new URL(context.request.url);
    const text = url.searchParams.get('text');

    if (!text) {
        return new Response('Missing text query parameter', { status: 400 });
    }

    const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=${encodeURIComponent(text)}`;

    try {
        const response = await fetch(googleUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        if (!response.ok) {
            return new Response('Error fetching TTS from Google', { status: 502 });
        }

        // Create a new response with the audio data and correct headers
        const newResponse = new Response(response.body, response);
        newResponse.headers.set('Content-Type', 'audio/mpeg');

        // Cache control (optional but good for performance)
        newResponse.headers.set('Cache-Control', 'public, max-age=31536000, immutable');

        return newResponse;
    } catch (e) {
        return new Response('Internal Server Error: ' + e.message, { status: 500 });
    }
}
