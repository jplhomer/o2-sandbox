import handleRequest from './src/App.server';
import indexTemplate from './dist/client/index.html?raw';

export default {
  async fetch(request, env, context) {
    if (!globalThis.Oxygen) {
      globalThis.Oxygen = {env};
    }

    globalThis.Oxygen.HYDROGEN_ENABLE_WORKER_STREAMING = true;

    try {
      return await handleRequest(request, {
        indexTemplate,
        cache: await caches.open('oxygen'),
        context,
        buyerIpHeader: 'oxygen-buyer-ip',
      });
    } catch (error) {
      return new Response(error.message || error.toString(), {status: 500});
    }
  },
};
