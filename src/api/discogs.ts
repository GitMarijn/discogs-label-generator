export interface ReleaseData {
    year: number;
    artist: string;
    title: string;
    styles: string[];
  }
  
  // Extract release ID from URL
  export function parseReleaseId(url: string): string | null {
    const match = url.match(/release\/(\d+)-/);
    
    return match ? match[1] : null;
  }
  
  export async function fetchRelease(id: string): Promise<ReleaseData> {
    const resp = await fetch(`https://api.discogs.com/releases/${id}`, {
      headers: {
        "User-Agent": "DiscogsDemoApp/1.0 +https://yourdomain.com",
      },
    });
    if (!resp.ok) throw new Error("Failed to fetch release");
    
    const data = await resp.json();

    return {
      year: data.year,
      artist: data.artists?.map((a: any) => a.name).join(", "),
      title: data.title,
      styles: data.styles || [],
    };
  }