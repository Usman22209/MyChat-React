import { bgColorPalette } from "@styles/colors";

type AvatarOptions = {
  size?: number;
  background?: string;
  color?: string;
};

function nameToIndex(str: string, max: number): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % max;
}

export function getAvatarUrl(
  firstName: string,
  lastName: string,
  options: AvatarOptions = {}
): string {
  const baseUrl = 'https://avatar.iran.liara.run/username';
  // Manually join names with a plus sign.
  const fullName = `${firstName.trim()}+${lastName.trim()}`;
  
  // Use concatenated first and last names for a consistent index.
  const index = nameToIndex(`${firstName}${lastName}`, bgColorPalette.length);
  const bgColor = options.background || bgColorPalette[index];
  const textColor = options.color || 'ffffff';

  const params = new URLSearchParams({
    username: fullName,
    background: bgColor,
    color: textColor,
  });

  if (options.size) {
    params.append('size', options.size.toString());
  }

  // Replace encoded '+' (%2B) back to '+'.
  const queryString = params.toString().replace(/%2B/g, '+');

  return `${baseUrl}?${queryString}`;
}

// Example usage:
const avatarUrl = getAvatarUrl('Sana', 'Khan');
console.log(avatarUrl);
// Expected Output: https://avatar.iran.liara.run/username?username=Sana+Khan&background=FF9800&color=ffffff
