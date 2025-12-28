export function buildAnimeParams(params: {
  page: number;
  query?: string;
  year?: number;
  minScore?: number;
  genres?: number[];
  orderBy?: string;
  sort?: string;
}) {
  const search = new URLSearchParams({
    page: String(params.page),
  });

  if (params.query) search.set("q", params.query);
  if (params.year) {
    search.set("start_date", `${params.year}-01-01`);
    search.set("end_date", `${params.year}-12-31`);
  }
  if (params.minScore) search.set("min_score", String(params.minScore));
  if (params.genres?.length) {
    search.set("genres", params.genres.join(","));
  }

  if (params.orderBy) search.set("order_by", params.orderBy);
  if (params.sort) search.set("sort", params.sort);

  return search.toString();
}

