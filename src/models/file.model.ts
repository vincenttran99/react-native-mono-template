export interface IMedia {
  media_id: string;
  media_url: string;
  media_filename: string;
  media_filetype: string;
  media_thumbnail: {
    "512x512": string;
    "300x200": string;
    "256x169": string;
    "128x128": string;
  };
}
