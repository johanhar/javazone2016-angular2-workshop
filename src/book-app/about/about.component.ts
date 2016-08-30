import { Component, OnInit } from '@angular/core';
import {BookService} from "../services/book.service";

@Component({
    'providers': [BookService],
    'selector': 'about',
    'template': `
        <p>We collect information about books ...</p>
        <p>Currently we have as many as {{ numberOfBooks }} books</p>
    `
})
// Oppgave 6.1 Denne klassen skal implementer riktig interface for
// å hente antall bøker etter at komponenten er intialisert.
export class About {

    // Dette viser vi i template, skal holde riktig antall av bøker.
    numberOfBooks: number = 0;

    constructor(private bookService: BookService) {
    }

    //Oppgave 6.1 BookService har en metode 'numberOfBooks', bruk den for
    //å hente riktig verdi til 'numberOfBooks' i ngOnInit-hook.

}