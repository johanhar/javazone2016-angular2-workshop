import {BOOK_DATA} from './book.data';
import {Book} from "../books/book.model";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {Subscriber} from "rxjs/Rx";

@Injectable()
export class BookService {

    getDetails(id: number): Book {
        let details = BOOK_DATA.find((element) => {
            return <number>element.id == <number>id;
        });
        return new Book(
            details.id,
            details.title,
            details.author,
            details.isbn,
            details.description
        );
    }

    search(searchKey: string): Observable<Book[]> {
        let searchResults: Book[] = BOOK_DATA.filter((book) => {
            return (book.author + book.title + book.isbn)
                .toLowerCase()
                .includes(searchKey);
        });
        return Observable.create((subscriber: Subscriber<Book[]>) => {
            subscriber.next(searchResults);
            subscriber.complete();
        });
    }

    numberOfBooks(): number {
        return BOOK_DATA.length;
    }

    getAll(): Book[] {
        return BOOK_DATA;
    }
}

