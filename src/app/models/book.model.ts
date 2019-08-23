export interface Book {
    id: number;
    title: string;
    author: string;
    price: number;
    description: string;
    img: string;
}

export interface Author {
    id: number;
    name: string;
    country: string;
    birthday: Date;
    deathday: Date;
    img: string;
}

export interface AuthorsBooks {
    authorId: number;
    bookId: number;
    author: Author;
    book: Book;
}
