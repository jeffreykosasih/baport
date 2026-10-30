import { ImageResponse } from 'next/og';

// The icon for home screens and bookmarks: the favicon's orange ring, larger.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#171b1f',
        }}
      >
        <div style={{ width: 112, height: 112, borderRadius: 56, border: '22px solid #ff6a1a' }} />
      </div>
    ),
    size,
  );
}
