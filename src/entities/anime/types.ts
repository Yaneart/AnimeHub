export interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      large_image_url: string;
      small_image_url: string;
    };
    webp?: {
      large_image_url: string;
      small_image_url: string;
    };
  };

  score: number | null;
  year: number | null;

  trailer?: {
    youtube_id?: string | null;
    url?: string | null;
    embed_url?: string | null;
  };
}

export interface GetAnimeListParams {
  page: number;
  query?: string;
  year?: number;
  minScore?: number;
}
