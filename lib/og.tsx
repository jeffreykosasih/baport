import { ImageResponse } from 'next/og';

// Link previews (the image LinkedIn, Slack and email show for a shared link)
// look like the top of each page: the night band, an orange kicker and a big
// uppercase title.

export const ogSize = { width: 1200, height: 630 };

const night = '#171b1f';
const day = '#f2f3f4';
const muted = '#9ba3ac';
const signal = '#ff6a1a';

type Fonts = NonNullable<NonNullable<ConstructorParameters<typeof ImageResponse>[1]>['fonts']>;

// next/og can't read the woff2 files next/font serves, so each font comes from
// Google Fonts as TrueType at build time, cut down to the letters it draws.
async function googleFont(family: string, weight: number, text: string) {
  const query = `family=${family.replaceAll(' ', '+')}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await fetch(`https://fonts.googleapis.com/css2?${query}`).then((res) => res.text());
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`Google Fonts sent no TrueType file for ${family}`);
  return fetch(url).then((res) => res.arrayBuffer());
}

export async function ogImage({ kicker, title, line, footer }: { kicker: string; title: string; line: string; footer: string }) {
  // Uppercased here rather than with CSS, so the font subsets hold the capitals.
  const [kickerCaps, titleCaps, footerCaps] = [kicker, title, footer].map((text) => text.toUpperCase());

  let fonts: Fonts = [];
  try {
    fonts = [
      { name: 'Albert Sans', data: await googleFont('Albert Sans', 600, titleCaps), weight: 600, style: 'normal' },
      { name: 'Albert Sans', data: await googleFont('Albert Sans', 400, line), weight: 400, style: 'normal' },
      { name: 'IBM Plex Mono', data: await googleFont('IBM Plex Mono', 500, kickerCaps + footerCaps), weight: 500, style: 'normal' },
    ];
  } catch (error) {
    // Better a preview in next/og's built-in font than a failed build.
    console.warn('Link preview fonts did not load, using the built-in font.', error);
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: night,
          color: day,
          fontFamily: 'Albert Sans',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: 'IBM Plex Mono', fontSize: 24, fontWeight: 500, letterSpacing: 2, color: signal }}>
            {kickerCaps}
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: titleCaps.length > 16 ? 108 : 150,
              fontWeight: 600,
              lineHeight: 0.94,
              letterSpacing: titleCaps.length > 16 ? -1.5 : -2.5,
            }}
          >
            {titleCaps}
          </div>
          <div style={{ marginTop: 36, maxWidth: 940, fontSize: 34, fontWeight: 400, lineHeight: 1.35, color: muted }}>
            {line}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 28,
            borderTop: '1px solid rgba(242, 243, 244, 0.16)',
            fontFamily: 'IBM Plex Mono',
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: 2,
            color: muted,
          }}
        >
          <span>{footerCaps}</span>
          {/* The site's mark: an orange ring, like a BPMN event. */}
          <span style={{ width: 32, height: 32, borderRadius: 16, border: `5px solid ${signal}` }} />
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}
