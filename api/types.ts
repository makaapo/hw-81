export interface Link {
  _id: string,
  originalUrl: string,
  shortUrl: string
}

export interface LinkMutation {
  originalUrl: string,
  shortUrl: string
}