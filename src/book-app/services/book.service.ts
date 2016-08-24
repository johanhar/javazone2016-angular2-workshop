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
        // Oppgave 5.1 her skal vi retunere en instans av Book-klasse.
        return new Book(
            details.id,
            details.title,
            details.author,
            details.isbn,
            details.description
        );
    }

    search(searchKey: string): Observable<Book[]> {
        // Filtrering av resultater
        let searchResults: Book[] = BOOK_DATA.filter((book) => {
            return (book.author + book.title + book.isbn)
                .toLowerCase()
                .includes(searchKey);
        });

        // En funksjon som skal bli eksekvert i en Observable
        let subscriberFunction = (subscriber: Subscriber<Book[]>) => {
            subscriber.next(searchResults);
            subscriber.complete();
        };
        // Oppgave 5.1 her skal vi lage en ny Observable som kjører
        // subscriber-funksjonen ovenfor.
        return Observable.create(subscriberFunction);
    }

    numberOfBooks(): number {
        return BOOK_DATA.length;
    }

    getAll(): Book[] {
        return BOOK_DATA;
    }
}

