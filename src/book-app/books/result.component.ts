import {Component, Input} from '@angular/core';
import {Book} from "./book.model";

@Component({
    'selector': 'result',
    'template': `
        <div class="result" *ngIf="isEmpty()"><b>No results.</b></div>
        <div class="result" *ngIf="!isEmpty()"><b>Found {{numberOfResults()}} books.</b></div>
    `
})
export class Result {
    @Input() results: Book[];

    isEmpty(): boolean {
        return this.results.length == 0;
    }

    numberOfResults(): number {
        return this.results.length;
    }
}