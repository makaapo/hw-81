export interface Link {
  _id: string,
  originalUrl: string;
  shortUrl: string;
}

export interface LinkForm {
  originalUrl: string;
}