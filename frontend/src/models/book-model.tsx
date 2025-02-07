export class BookModel {

    constructor(
        public id: number,
        public title: string,
        public first_publish_year: number,
        public author_name?: string,
        public cover_i?: number
    ) {
        this.id = id;
        this.title = title;
        this.first_publish_year = first_publish_year;
        this.author_name = author_name;
        this.cover_i = cover_i;
    }
}