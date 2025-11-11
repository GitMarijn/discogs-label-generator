export interface ReleaseData {
  year: number;
  artist: string;
  title: string;
  styles: string[];
}

export interface PriceSuggestion {
  currency: string;
  value: number;
}

export interface PricingData {
  [condition: string]: PriceSuggestion;
}

// Extract release ID from URL
export function parseReleaseId(url: string): string | null {
  const match = url.match(/release\/(\d+)-/);

  return match ? match[1] : null;
}

export async function fetchRelease(id: string): Promise<ReleaseData> {
  const response = await fetch(`https://api.discogs.com/releases/${id}`, {
    headers: {
      "User-Agent": "DiscogsDemoApp/1.0 +http://localhost:3000", // TODO: Change to the actual domain
    },
  });
  if (!response.ok) throw new Error("Failed to fetch release");

  const data = await response.json();

  return {
    year: data.year,
    artist: data.artists?.map((a: any) => a.name).join(", "),
    title: data.title,
    styles: data.styles || [],
  };
}

// Get Discogs token from environment variables
const getDiscogsToken = (): string | null => {
  return import.meta.env.VITE_DISCOGS_TOKEN || null;
};

export async function fetchPricingData(id: string): Promise<PricingData> {
  const token = getDiscogsToken();

  if (!token) {
    console.warn(
      "Discogs token not found. Pricing data will not be available."
    );
    return {};
  }

  const headers: Record<string, string> = {
    "User-Agent": "DiscogsDemoApp/1.0 +https://yourdomain.com",
    Authorization: `Discogs token=${token}`,
  };

  const response = await fetch(
    `https://api.discogs.com/marketplace/price_suggestions/${id}`,
    { headers }
  );

  if (!response.ok) {
    if (response.status === 401) {
      console.warn("Discogs authentication failed. Please check your token.");
    } else if (response.status === 404) {
      console.warn("Pricing data not available for this release.");
    } else {
      console.warn(
        `Failed to fetch pricing data: ${response.status} ${response.statusText}`
      );
    }
    return {};
  }

  return await response.json();
}
