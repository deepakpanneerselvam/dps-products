'use client';

interface AdSenseProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
}

export default function AdSense({ slot, format = 'auto', responsive = true }: AdSenseProps) {
  // Note: In production, replace 'ca-pub-xxxxxxxxxxxxxxxx' with your actual AdSense publisher ID
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID || 'ca-pub-xxxxxxxxxxxxxxxx';

  // Only render ads in production to avoid development warnings
  if (process.env.NODE_ENV !== 'production' && publisherId === 'ca-pub-xxxxxxxxxxxxxxxx') {
    return (
      <div className="bg-neutral-100 border border-neutral-300 rounded p-4 text-center text-sm text-neutral-600">
        AdSense Placeholder - {slot}
      </div>
    );
  }

  return (
    <div className="my-4">
      <ins
        className="adsbygoogle"
        style={{
          display: responsive ? 'block' : undefined,
          textAlign: 'center',
        }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
