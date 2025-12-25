export interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      large_image_url: string;
    };
    webp?: {
      large_image_url: string;
    };
  };
  score: number | null;
  year: number | null;
}

export interface GetAnimeListParams {
  page: number;
  query?: string;
  year?: number;
  minScore?: number;
}
