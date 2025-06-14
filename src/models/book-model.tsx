export class BookModel {
  constructor(
    public key: string,
    public title: string,
    public first_publish_year: number,
    public author_name?: string,
    public cover_i?: number,
  ) {
    this.key = key;
    this.title = title;
    this.first_publish_year = first_publish_year;
    this.author_name = author_name;
    this.cover_i = cover_i;
  }
}
