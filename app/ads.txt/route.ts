import {
  ADSENSE_PUBLISHER_RECORD,
  getAdSenseClientId,
  getAdSensePublisherId,
  isAdSenseConfigured,
} from '@/lib/ads';

function buildAdsTxtBody() {
  const clientId = getAdSenseClientId();

  if (!isAdSenseConfigured(clientId)) {
    return '# Google AdSense is not configured for this deployment.\n';
  }

  return `google.com, ${getAdSensePublisherId(clientId)}, DIRECT, ${ADSENSE_PUBLISHER_RECORD}\n`;
}

export async function GET() {
  return new Response(buildAdsTxtBody(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
