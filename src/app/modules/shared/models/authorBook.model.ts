import { Author, Book } from './index';

export interface AuthorsBooks {
    authorId: number;
    bookId: number;
    author: Author;
    book: Book;
}
