import { profile } from '@/content/profile';
import { ogImage, ogSize } from '@/lib/og';

// "Jeffrey Kosasih, junior ICT business analyst in Melbourne"
export const alt = `${profile.name}, ${profile.role[0].toLowerCase()}${profile.role.slice(1)} in ${profile.location}`;
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return ogImage({
    kicker: `${profile.role}, ${profile.location}`,
    title: profile.headline,
    line: profile.lead,
    footer: profile.name,
  });
}
