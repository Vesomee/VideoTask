export interface Video {
    imdbID: string;
    Year: string;
    Plot: string;
    Title: string;
    Poster: string;
    imdbRating: number;
    imdbVotes: number;
}

export interface SearchVideoResponse {
    Search: Video[];
}
