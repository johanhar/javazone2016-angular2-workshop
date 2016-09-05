# JavaZone 2016
## TypeScript og Angular2 workshop

I denne workshoppen skal vi lage en applikasjon for å håndtere et bibliotek av bøker.

## Før du begynner
 - `git clone git@github.com:johanhar/javazone2016-angular2-workshop.git`
 - `npm install`

## Oppgave 1 - Component

Vi kjenner alle til innebygde HTML elementer som `<select>` og `<form>`. Med Angular har du mulighet til å lage dine egne elementer med Component. I korte trekk er en Angular-app et tre av Components.

### Definisjonen på en Component
Man kan si at en Component består av to deler:
 1. Metadata (Component annotation)
 2. Klasse (Component definition class)

Her er et eksempel på en enkel Component:
```javascript
import { Component } from '@angular/core';

@Component({
    'selector': 'hello-world',
    'template': `<h1>Hello world</h1>`
})
export class HelloWorld {}
```

Denne Component vil man kunne bruke i en HTML-fil slik:
```html
<body>
  <hello-world></hello-world>
</body>
```

Angular vil ta innholdet fra `template` og plassere det i `<hello-world>` slik at det ferdige resultatet vil se slik ut:

```html
<body>
  <h1>Hello world</h1>
</body>
```

#### Metadata/annotation
Vi binder metadata til Component sin klasse med bruk av annotation `@Component`. Selve metadataen kommer i form av JSON.

I eksempelet ovenfor har vi valgt å putte HTML direkte i annotation, men vi kan velge å plassere HTML i en egen fil:

```javascript
@Component({
    'selector': 'hello-world',
    'templateUrl': 'hello-world.html'
})
```

Her har vi valgt å definere Component sitt view (HTML) i en egen fil med navnet hello-world.html.

#### Klasse
Selve logikken til en Component legger vi i klassen. Her kan vi ha variabler og funksjoner som blir tilgjengelige for view/template. Dette gjør at appen vår blir interaktiv for brukeren. Det som for eksempel skal skje når brukeren trykker på en knapp i Component sitt view kan man legge i klassen. Mer om dette senere.

### Gå riktig branch før du starter oppgaven
Du står sannsynligvis i `master` branchen til prosjektet nå, 
før du setter i gang med oppgave 1 så må du hoppe over til en egen branch som gir deg riktig utgangspunkt for å sette i gang med oppgavene.
Åpne en terminal og gå til roten av prosjektmappen.

```
git checkout -f oppgave1-2
```

## Oppgave 1.1 - Vår første component
### Opprett appens rot-komponent
Angular er som sagt et tre av komponenter, vi starter med å opprette selve roten som igjen vil bruke andre komponenter.

La oss kalle den noe så enkelt som `BookApp`.

**Opprett en fil: /src/book-app/book-app.component.ts**
```javascript
import { Component } from '@angular/core';

@Component({
    'selector': 'book-app',
    'template': `<h1>Book app</h1>`
})
export class BookApp {}
```

## Oppgave 1.2 - Bootstrap appen
En Angular applikasjon må bootstrappes med rot-komponenten. Dette gjør at vi kan bruke `<book-app>` elementet fra `index.html`. Resten av appen har sitt utspring fra rot-komponenten.

### Rediger følgende filer

**/src/main.ts**
```javascript
import { bootstrap } from '@angular/platform-browser-dynamic';
import { BookApp } from './book-app/book-app.component';

bootstrap(BookApp, []);
```

**/src/index.html**
```html
...
<body>
  <book-app></book-app>
</body>
...
```

Man kan nå prøve å kjøre appen og se om alt stemmer så langt. Åpne en terminal og kjør følgende:

```
npm start
```

Gå så til [http://localhost:8080](http://localhost:8080).

## Oppgave 1.3 - Navigasjonsbar
La oss fortsette med å lage en enkel komponent for navigasjon. Hensikten med denne oppgaven er å vise hvordan en komponent kan bygges opp av andre komponenter. 

#### Directive
Hvis du kommer fra Angular 1 har du sikkert hørt om Directive. 
Angular 2 bruker fortsatt begrepet direktiv, det er nemlig sånn at Component er en subtype av Directive. 
Det finnes flere typer direktiv, hvor komponent er en av typene.

Før man kan bruke andre direktiver og komponenter må man fortelle Angular om dette. Dette kan gjøres i metadata/annotation til komponenten.

```javascript
// Dette er bare eksempel og ikke en del av oppgaven
@Component({
  selector: 'product-row',
  directives: [ProductImage, ProductDepartment, PriceDisplay],
  template: `
  <div class="content">
    <div class="header">{{ product.name }}</div>
    <div class="meta">
      <div class="product-sku">SKU #{{ product.sku }}</div>
    </div>
    <div class="description">
      <product-department [product]="product"></product-department>
    </div>
  </div>
  <price-display [price]="product.price"></price-display>
  `
})
class ProductRow {
  product: Product;
}
```

Her kan man se en komponent kalt `ProductRow` som er bygget opp av flere mindre komponenter. Hvis vi ser i viewet/templaten finner vi tags som `<product-department>` og `<price-display>`. For at disse taggene skal vises må man liste opp hver tilhørende komponent i attributten `directives` til `@Component`.

### Opprett en ny fil for navbar komponenten
**/src/book-app/navbar.component.ts**
```javascript
import { Component } from '@angular/core';

@Component({
    'selector': 'navbar',
    'template': `
        <nav class="nav">
            <ul class="nav__links">
                <li>Books</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <span class="nav__title">Book app</span>
        </nav>
    `
})
export class Navbar {}
```

### Editer rot-komponenten
**/src/book-app/book-app.component.ts**
```javascript
import { Component } from '@angular/core';
import { Navbar } from './navbar.component';

@Component({
    'directives': [Navbar],
    'selector': 'book-app',
    'template': `
        <div class="main-container">
        
            <navbar></navbar>

            <div class="container">              
               
            </div>
        </div>
    `
})
export class BookApp {}
```

Du trenger ikke å kjøre `npm start` om igjen, [http://localhost:8080](http://localhost:8080) oppdateres automatisk ved endringer.

## Oppgave 2 - Routing
Du har kanskje hørt uttrykket "Single Page Application". Angular sin router gjør det mulig å endre nettleseren sin URL uten at man gjør et nytt page load, og bytte ut deler av siden med andre komponenter for bestemte ruter.

#### RouterConfig
Brukes til å beskrive appens ruter.

```javascript
// Dette er bare et eksempel og ikke en del av oppgaven
const routes: RouterConfig = [
  { path: '', redirectTo: 'home', terminal: true },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'contactus', redirectTo: 'contact' },
];

bootstrap(RoutesDemoApp, [
  provideRouter(routes), // <-- installs our routes
  provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
```

Ovenfor ser vi at man bootstrapper appen samtidig som vi forteller Angular hvilke ruter vi skal ha. 
Man kan for eksempel definere alle ruter ved bootstrapping på et sted (som her), eller la hver komponent selv fortelle hvilke ruter den tilbyr.

#### RouterOutlet
Fungerer som en placeholder for innholdet til en rute.

```javascript
// Dette er bare eksempel og ikke en del av oppgaven
@Component({
  selector: 'router-app',
  directives: [ROUTER_DIRECTIVES],
  template: `
  <div>
    <nav>
      <a>Navigation:</a>
      <ul>
        <li><a [routerLink]="['home']">Home</a></li>
        <li><a [routerLink]="['about']">About</a></li>
        <li><a [routerLink]="['contact']">Contact us</a></li>
      </ul>
    </nav>

    <router-outlet></router-outlet>
  </div>
  `
})
class RoutesDemoApp {
}
```

Her vil `<router-outlet>` bli fyllt med riktig komponent for den ruten man befinner seg på.

#### RouterLink
Et direktiv brukt til å linke til ruter.

```html
<li><a [routerLink]="['home']">Home</a></li>
```

Syntaksen er kanskje ikke så enkel å forstå her. Vi kommer mer inn på dette senere. 
Det man trenger å forstå foreløpig er at routerLink er et direktiv som gjør at man istedenfor å skrive:

```html
<a href="hardkodet url til rute">
```

Heller skriver:

```html
<a [routerLink]="['path definert i RouterConfig']">
```

## Oppgave 2.1 - Opprett komponenter for rutene
Før vi lager selve rutene oppretter vi noen foreløpig tomme komponenter.

Legg merke til at vi her velger å legge hver komponent i en egen mappe under rot komponenten.

Foreløpig har vi bare én TypeScript fil i hver komponent-mappe, senere når appen vokser kan det fort hende at man ønsker å ha mer:
 - et spec (for enhetstester tilknyttet komponenten)
 - stilsett/css tilknyttet komponenten
 - template/html i egen fil (istedenfor å definere templaten direkte i annotation)
 - flere (under)komponenter

**Dette er bare et eksempel som ikke nødvendigvis har noe fasitsvar.** 
```
/src
  /book-app
    /books
      books.component.ts
      books.template.html
      books.spec.ts
      books.styles.css
      books.e2e.ts

      /book-row
        etc ...

      /book-detail
        etc... 
```


**/src/book-app/books/books.component.ts**
```javascript
import { Component } from '@angular/core';

@Component({
    'selector': 'books',
    'template': `<h1>Look at all these books!</h1>`
})
export class Books {}
```

**/src/book-app/contact/contact.component.ts**
```javascript
import { Component } from '@angular/core';

@Component({
    'selector': 'contact',
    'template': `<p>We only take fax: 22225555</p>`
})
export class Contact {}
```

**/src/book-app/about/about.component.ts**
```javascript
import { Component } from '@angular/core';

@Component({
    'selector': 'about',
    'template': `<p>We collect information about books ...</p>`
})
export class About {}
```

## Oppgave 2.2 - Definer ruter til hver komponent

### Opprett og bootstrap rutene
**/src/main.ts**
```javascript
import { bootstrap } from '@angular/platform-browser-dynamic';

import { BookApp } from './book-app/book-app.component';
import { About } from './book-app/about/about.component';
import { Books } from './book-app/books/books.component';
import { Contact } from './book-app/contact/contact.component';

import {bind, Component} from '@angular/core';
import {
  ROUTER_DIRECTIVES,
  provideRouter,
  Router,
  RouterConfig
} from '@angular/router';

import {LocationStrategy, HashLocationStrategy} from '@angular/common';

const routes: RouterConfig = [
    {
        path: '', 
        redirectTo: 'books', 
        terminal: true
    },
    {
        path: 'about', 
        component: About
    },
    {
        path: 'books',
        component: Books
    },
    {
        path: 'contact',
        component: Contact
    }
];

bootstrap(BookApp, [
    provideRouter(routes),
    bind(LocationStrategy).toClass(HashLocationStrategy)
]);
```

Hvis vi tar en titt i consolen til nettleseren vår nå finner vi sikkert flere feil.
Dette skyldes at rot komponenten ikke har tatt i bruk `RouterOutlet`.

### Ta i bruk RouterOutlet
**/src/book-app/book-app.component.ts**
```javascript
import { Component } from '@angular/core';
import { Navbar } from './navbar.component';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    'directives': [Navbar, ROUTER_DIRECTIVES],
    'selector': 'book-app',
    'template': `
        <div class="main-container">
            <navbar></navbar>
            <div class="container">              
                <router-outlet></router-outlet>
            </div>
        </div>
    `
})
export class BookApp {}
```

### Ta i bruk RouterLink
**/src/book-app/navbar.component.ts**
```javascript
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    'directives': [ROUTER_DIRECTIVES],
    'selector': 'navbar',
    'template': `
        <nav class="nav">
            <ul class="nav__links">
                <li><a [routerLink]="['books']">Books</a></li>
                <li><a [routerLink]="['about']">About</a></li>
                <li><a [routerLink]="['contact']">Contact</a></li>
            </ul>
            <span class="nav__title">Book app</span>
        </nav>
    `
})
export class Navbar {}
```

Nå burde det være mulig å navigere seg mellom komponenter i appen.
Som forklart tidligere er det bare den delen av siden hvor man har plassert `<router-outlet>` at man bytter til en ny komponent for hver rute.
Istedenfor å bruke `<a href="..">` så bruker vi `<a [routerLink]="['rute']"> til å linke mellom ruter. 

## Oppgave 3 - Template bindings

### Gå riktig branch før du starter oppgaven
```
git checkout -f oppgave3
```
Det er viktig at du bruker **-f opsjonen** i kommandoen!

Ta en titt på følgende eksempel:

```javascript
@Component({
  selector: 'my-component',
  template: `<h1>{{ someValue }}</h1>`
})
class MyComponent {
  someValue: String = "I'm a value you can display in the template...";
}
```

Syntaksen **{{...}}** kalles for template binding. Vi henter `someValue` fra MyComponent klassen og viser den i templaten.
Koden du finner på innsiden av **{{...}}** er en expression, det betyr at man kan gjøre forskjellige ting som:

```javascript
{{ count + 1 }}
```

```javascript
{{ myFunction(myArguments) }}
```

La oss teste dette med et enkelt eksempel i vår egen app..
### Vis antall bøker i About komponenten
**Endre koden i filen: /src/book-app/about/about.component.ts**
```javascript
import { Component } from '@angular/core';

@Component({
    'selector': 'about',
    'template': `
        <p>We collect information about books ...</p>
        <p>Currently we have as many as {{ numberOfBooks }} books</p>
    `
})
export class About {
    numberOfBooks: Number = 2;
}
```

#### Hvor ble det av $scope?
For de som har jobbet med Angular 1 så legger man kanskje merke til at `$scope` er borte.
Alle funksjoner og variabler i klassen `About` vil være synlige for templaten.

## Oppgave 3.1 - NgFor
La oss ta i bruk template binding i sammenheng med en for-løkke. 
For hver bok i biblioteket ønsker vi å vise en rad i en tabell.

Angular har et innebygd direktiv for å lage for-løkker, det heter `NgFor`.
Syktaksen er litt spesiell, men er enkel å forstå når man først skjønner tanken bak.

```
<li *ngFor="let item of items"> {{ item.someValue }} </li>
```

Her lager vi en ny `<li>` for hver iterasjon av `items` (som kommer fra klassen til viewet).
Stjerne i `*ngFor` betyr at vi har med et direktiv å gjøre som går under kategorien [Structural Directives](https://angular.io/docs/ts/latest/guide/structural-directives.html).
Disse type direktiv vil legge til eller fjerne deler av vårt view ved rendring.

Et godt eksempel er `*ngIf`:
```html
<p *ngIf="condition">
  vises bare hvis condition er true
</p>
```

Vi kan lage våre egne direktiv som viser eller skjuler deler av vårt view basert på en tilstand eller data,
og disse vil da brukes stjerne-syntaksen. Men dette skal vi ikke gjøre i denne workshopen, vi fokusere kun på innebygde direktiv for nå.

La oss teste NgFor i vår egen app.

### Lag en liste av bøker
**Legg til koden i filen: /src/book-app/books/books.component.ts**
```javascript
import { Component } from '@angular/core';

@Component({
    'selector': 'books',
    'template': `
        <h1>Look at all these books!</h1>
        <ul>
            <li *ngFor="let book of books">{{book}}</li>
        </ul>
    `
})
export class Books {
    books: [String] = ['Steelheart', 'Enders game', 'The Name of the Wind']
}
```

Ta en titt under http://localhost:8080/#/books så har vi nå ganske enkelt laget en liste av bøker med `*ngFor`.

## Oppgave 3.2 - En egen klasse for Bok
Istedenfor å bruke et array av strings, så kan vi lage en klasse i TypeScript som representerer en bok.

### Opprett en Book model
**Opprett en fil: /src/book-app/books/book.model.ts**
```javascript
export class Book {
    constructor(
        public id: Number,
        public title: String,
        public author: String,
        public isbn: String,
        public description: String) {}
}
```

Bruken av `.model.ts` her har ingenting å si, det er konvensjon vi lager for oss selv, på lik linje med `.component.ts`, eller `.template.html`.

#### Tom constructor?
Det stemmer ...
Vi ønsker ikke at det skal være mulig å lage en bok uten å ha alle felter.
Hvert argument i constructor vil automatisk bli en property til klassen, og hver property vil bli assigned.

Mer eksplesitt kunne vi har skrevet:
```javascript
class Book {
    id: Number
    title: String;
    author: String;
    isbn: Number;
    description: String;

    constructor(id: Number, title: String, author: String, isbn: Number, description: String) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.description = description;
    }
}
``` 

Det er kanskje enklere å forstå, mange vil foretrekke denne versjonen.
Det er mest vanlig med TypeScript å bruke vårt første eksempel:
 * hver property blir definert i constructor, de trengs ikke å defineres på forhånd
 * hver property vil bli assigned automatisk, vi trenger ikke å gjøre det selv med `this.property = argument`

**NB:** For at de to punktene ovenfor skal bli oppfyllt må argumentet være `public`.

## Oppgave 3.3 - En tabell av bøker
La oss fortsette med listen av bøker med å bruke en `<table>` istedenfor `<ul>`. 
For hver rad i tabellen ønsker vi å ha en egen komponent.
Til å starte med er hver rad lik, den samme hardkodet boken.
Senere vil vi kunne utvide med data fra en server.

### Opprett en egen komponent til hver rad
**Opprett en fil: /src/book-app/books/book-row.component.ts**
```javascript
import { Component } from '@angular/core';
import { Book } from './book.model';

@Component({
    'selector': 'tr[book-row]',
    'template': `
        <td>{{book.title}}</td>
        <td>{{book.author}}</td>
        <td>{{book.isbn}}</td>
    `
})
export class BookRow {
    book = new Book(1, 'The book title', 'The author', 'ISBN 123', 'Some description');
}
```

### Ta i bruk den nye komponenten i tabellen
**Opprett en fil: /src/book-app/books/books.component.ts**
```javascript
import { Component } from '@angular/core';
import { BookRow } from './book-row.component';

@Component({
    'selector': 'books',
    'directives': [BookRow],
    'template': `
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                </tr>
            </thead>
            <tbody>
                <!-- snart lager vi en NgFor her istedenfor -->
                <tr book-row></tr>
                <tr book-row></tr>
                <tr book-row></tr>
                <tr book-row></tr>
            </tbody>
        </table>
    `
})
export class Books {}
```

Syntaksen i BookRow sin selector er litt annerledes.
Vi sier at man skal kun bruke komponenten som en attributt på et html element, og det må være en `<tr>`.
Dette gjør vi for å slippe at Angular rendrer følgende:
```html
<tbody>
    <book-row> <!-- Ikke gyldig html i tbody, browseren vil ikke vise dette. -->
        <tr>
            <td>...</td>
        </tr>
    </book-row>
</tbody>
```

men heller ... :
```html
<tbody>
    <tr>
        <td>...</td>
    </tr>
</tbody>
```

## Oppgave 3.4 - Input
Akkurat nå er alle bøker like... 
Hvordan kan vi gi en liste av BookRow hver sin Book model?

#### [squareBrackets]
Syntaksen for å gi en komponent input er med "square brackets":
```html
<some-component [someValue]="theValue"></some-component>
```

For at `<some-component>` skal kunne ta imot input må den si hvilke properties i klassen som skal kunne assignes fra utsiden:
```javascript
@Component({
    'selector': 'some-component',
    'inputs': ['someValue'],
    'template': `...`
})
export class SomeComponent {
    someValue: String;
}
```

Et alternativ og mer populær måte å gjøre det på er å binde propertien i klassen med annotation `@Input`.

```javascript
@Component({
    'selector': 'some-component',
    'template': `...`
})
export class SomeComponent {
    @Input() someValue: String;
}
```

Her har man mulighet til å gi et alias til propertien:
```javascript
export class SomeComponent {
    @Input('value') someValue: String;
}
```

La oss late som at Books henter en liste av bøker fra en server (dette kommer vi mer inn på senere).
Når du skiftet branch i starten av oppgaven (`git checkout -f oppgave3`) fikk du med en fil som vi har laget for deg (/src/book-app/books/book.data.ts.tmp)
### Endre navnet til filen book.data.ts.tmp til book.data.ts (altså fjern .tmp fra navnet)
### Endre BookRow til å ta imot Book med @Input
**/src/book-app/books/book-row.component**
```javascript
import { Component, Input } from '@angular/core';
import { Book } from './book.model';

@Component({
    'selector': 'tr[book-row]',
    'template': `
        <td>{{book.title}}</td>
        <td>{{book.author}}</td>
        <td>{{book.isbn}}</td>
    `
})
export class BookRow {
    @Input('book-row') book: Book;
}
```

### Gi hver BookRow sin egen Book
**/src/book-app/books/books.component**
```javascript
import { Component } from '@angular/core';
import { BookRow } from './book-row.component';
import { BOOK_DATA } from './book.data';
import { Book } from './book.model';

@Component({
    'selector': 'books',
    'directives': [BookRow],
    'template': `
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let book of books" [book-row]="book"></tr>
            </tbody>
        </table>
    `
})
export class Books {
    books: [Book] = BOOK_DATA
}
```

## Oppgave 3.5 - Output
Nå har vi sett på input. Hvordan kan en komponent sende output til sin parent og fortelle om events og lignende?

#### (parentes)
Syntaksen for at en parent (foreldre-komponent) kan ta imot output er slik:
```html
<products-list (onProductSelected)="productWasSelected($event)">
``` 

Metoden `productWasSelected` er noe vi må definere selv, en metode vi ønsker å binde i vår komponent med `onProductSelected` sitt output.

For at ProductsList skal kunne sende fra seg outputs må den si fra om dette med annotation `@Output`:
```javascript
class ProductsList {
    @Output() onProductSelected: EventEmitter<Product>;
}
```

### Gjør hver rad klikkbar
Vi skal ikke se nærmere på `EventEmitter` og `@Output` med det første.
Dette har bare vært en kort innføring for nå.
Til å begynne med bruker vi Angular sitt innebygde direktiv Click.

**/src/book-app/books/books.component.ts**
Endre koden i template:
```javascript
<tr *ngFor="let book of books" [book-row]="book" (click)="bookSelected(book)"></tr>
```
Legg til en metode i Books-klasse.
```javascript
bookSelected(book: Book) {
    console.log(book);
}
```

Consolen din skal nå printe ut boken du klikker på.

Før vi navigerer videre fra tabellen til et eget view med mer detaljer for boken må vi ta en innføring i DI (Dependency Injection).
Vi må nemlig ha tak i `Router` i vår komponent slik at vi kan gjøre noe lignende:
```javascript
bookSelected(book: Book) {
    this.router.navigate(['/books', book.id]);
}
```
Mer om dette senere.

## Oppgave 4 - Forms

### Skift til riktig branch
```
git checkout -f oppgave4
```
Det er viktig at du bruker **-f opsjonen** i kommandoen!

### Lag et kontakt oss skjema
**Endre koden i filen: /src/book-app/contact/contact.component.ts**
```html
import { Component } from '@angular/core';

@Component({
    'selector': 'contact',
    'template': `
        <form>
            <input type="text" name="name" placeholder="Name *">
            <input type="email" name="email" placeholder="Email">
            <textarea placeholder="Message *" name="messageText"></textarea>
            <button type="submit">Contact us</button>
        </form>
    `
})
export class Contact {}
```

Dette er utgangspunktet for skjemaet som vi skal bygge videre på.
Ta en titt i nettleseren at alt ser greit ut så langt..

## Oppgave 4.1 - FormControl og FormGroup
En FormControl representerer et felt i et skjema.
En FormGroup er en samling av én eller flere FormControl.

Skjemaet vi har startet på har tre felter, vi vil altså trenge tre FormControl og én FormGroup i vår komponent sin klasse.
Vi kommer altså til å binde hvert `<input>` og `<textarea>` til en FormControl i klassen, samt binde `<form>` til en FormGroup.

### Bind <input> til hver sin FormControl
Nedenfor ser du koden for å knytte sammen et `<input>` til en FormControl fra klassen/komponenten.
Her er da `contactForm` en property vi ikke enda har skrevet (det gjør vi snart), som igjen har et sett av FormControls. 

**Endre koden i filen: /src/book-app/contact/contact.component.ts**
```html
<input type="text" 
    name="name" 
    placeholder="Name *"
    [formControl]="contactForm.controls['name']">
```
Gjør det samme for epost og meldingsfeltet.

### Bind skjema til FormGroup
**Endre koden i filen: /src/book-app/contact/contact.component.ts**
```html
<form [formGroup]="contactForm" (ngSubmit)="onSubmit(contactForm.value)">
```

Vi skal snart sette opp `contactForm` og den metoden `onSubmit(value: string)` i klassen.

## Oppgave 4.2 - FormBuilder
Koden du har skrevet til nå kjører ikke særlig bra, vi trenger å sette ting sammen i klassen.

### Importer nødvendige direktiv
Før du kan sette i gang å bruke forms i Angular trenger komponenten din en rekke komponenter og direktiv.

**Endre koden i filen: /src/book-app/contact/contact.component.ts**
```javascript
...
import {
  FORM_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup
} from '@angular/forms';

@Component({
    'selector': 'contact',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
...
```

### Ta i bruk FormBuilder for å lage FormGroup
La oss se nærmere på det som må gjøres i klassen, nå som vi har gjort ferdig view biten.
Det første vi må gjøre er å lage vår FormGroup med FormBuilder.

**/src/book-app/contact/contact.component.ts**
```javascript
export class Contact {
    contactForm: FormGroup;

    constructor(formBuilder: FormBuilder) {
        this.contactForm = formBuilder.group({
            'email': [''],
            'name': [''],
            'message': ['']
        })
    }

    onSubmit(value: string): void {
        console.log('you submitted value: ', value);
    }
}
```

Hvor kommer FormBuilder fra? Dette forklarer vi nærmere senere når vi går gjennom Dependency Injection.
Prøv å submit skjema og se hva som blir logget i consolen.

## Opgpave 4.3 - Feedback ved submit
Det er kanskje litt kjedelig å bare logge til console, la oss prøve å gjøre appen litt mer "ekte" med å gi en tilbakemelding ved submit.

### Legg til følgende kode i Contact komponenten
**/src/book-app/contact/contact.component.ts**
```javascript
// Dette er ikke hele filen, bare det som du skal legge inn ekstra på riktige steder
@Component({
    'template': `
        <p class="center" *ngIf="submitted">Thank you for contacting us!</p>
    `
})
export class Contact {
    contactForm: FormGroup;
    submitted: boolean = false;

    onSubmit(value: string): void {
        console.log('you submitted value: ', value);
        this.contactForm.reset();
        this.submitted = true;

        setTimeout(() => {
            this.submitted = false;
        }, 2000);
    }
}
```

Som vi har snakket om før så vil `<p *ngIf="submitted">` sitt innhold vises/skjules når `submitted` endres.
Angular tar seg av endringer i viewet, man trenger bare å sette `submitted` og så vil resten skje automatisk.

## Oppgave 4.4 - Validering
Som du kan se har vi prøvd å merke navn og melding som obligatorisk med å bruke stjerne, 
en typisk måte å si til brukeren at dette feltet må være med (`placeholder="Name *"`).
Vi har også et felt for epost, som nå valideres av nettleseren din (HTML5).

### Slå av HTML5 validering
Ofte ønsker vi kontrollen på feilmeldinger selv, så la oss starte med å slå av HTML5 validering.

**/src/book-app/contact/contact.component.ts**
```html
<form [formGroup]="contactForm" 
    (ngSubmit)="onSubmit(contactForm.value)" 
    novalidate>

<input type="email" 
    name="email" 
    placeholder="Email"
    [formControl]="contactForm.controls['email']" 
    novalidate>
```

### Legg til feilmeldinger
Det er mange måter å vise feilmeldinger på, 
vi gjør det enkelt (og ikke nødvendigvis penest og best) med å vise alle type feil i bunnen av skjema i en samlet `<div>`.

**/src/book-app/contact/contact.component.ts**
```html
<div class="center">
    <p *ngIf="!contactForm.controls['name'].valid && contactForm.controls['name'].touched">Name is required</p>
    <p *ngIf="!contactForm.controls['email'].valid && contactForm.controls['email'].touched">Email is invalid</p>
    <p *ngIf="!contactForm.controls['message'].valid && contactForm.controls['message'].touched">Message is required</p>
</div>
```

### Legg på validering
For at validering skal fungere må vi si til hver enkelt FormControl hva slags validering som gjelder for den.

**/src/book-app/contact/contact.component.ts**
```javascript
import {
  FORM_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup,
  Validators // må også importeres når vi skal bruke validering 
} from '@angular/forms';

// Legg til validering for hvert felt
constructor(formBuilder: FormBuilder) {
    this.contactForm = formBuilder.group({
        'email': ['', Validators.pattern('^[^ ]+@[^ ]+\\.[^ ]+$')],
        'name': ['', Validators.required],
        'message': ['', Validators.required]
    })
}
```

### Gjør submit-knappen disabled når formen er ugyldig
Angular har et innebygd direktiv for å gjøre felter og knapper disabled. 

**Editer: /src/book-app/contact/contact.component.ts**
```html
<button type="submit" [disabled]="!contactForm.valid">Contact us</button>
```

Nå kan du prøve å sende formen og se om valideringen virkelig fungerer!

Dette er helt enkel validering.
Det er mye mer man kan gjøre med forms og validering, 
men for nå i denne workshopen ser vi oss ferdige og går videre til andre oppgaver.

## Oppgave 5 Services og DI (dependency injection)

### Skift til riktig branch
```
git checkout -f oppgave5-7
```

For å hente data til bøker, skal vi lage en service som komponenter
kan utnytte for å søke etter bøker. Vi må også fortelle til Angular at 
vår service er tilgjengelig for *dependency injection*, slik at komponenter
som vil ha servicen kan få tak i den.

## 5.1 Lage en service
Servicen vår mangler noen funksjonalitet som du må oppfylle.
Se på filen *src/book-app/services/book.service.ts* og følg instruksjoner der.

## 5.2 Gjør servicen tilgjengelig for DI
For at en komponent skal bli tilgjengelig for DI må du annotere den
med @Injectable() Husk å bruke parenteser, ellers får du mange rare feilmeldinger! 
Denne annotasjonen skal ligge i *src/book-app/services/book.service.ts*

De komponentene som skal bruke vår @Injectable() service-klasse må:
* sette 'providers' i en @Component-annotasjonen 
* legge til parametre i constructor som skal injectes

F.eks. 
```javascript
@Component({
    'selector': 'about',
    'providers': [MyService]
    ....
})
class MyComponent {
    
    constructor(private myService: MyService) {
    }
    ....
}

```
**Legg til providers og constructor i src/book-app/books/books.component.ts** 

Hva er *provider* da ?
Provider er en klasse som vet hvordan man lager instanser av klasser
som skal bli injected. Provider kan være f.eks. være en factory-klasse, men 
som vanlig er den en klasse som skal bli injected selv. Altså i vår tilfelle BookService-klasse.

**Ta i bruk bookService i src/book-app/books/books.component.ts**
Linjen 
```javascript
// this.books = this.bookService.getAll();
```
er kommentert ut. Ta den i bruk.

## 5.3 En detaljert visning av hver bok
Nå som vi har sett litt på Dependency Injection så kan vi fortsette med listen av bøker.

### Naviger til en detaljert visning av valgt bok
Når brukeren trykker på en bok i tabellen av bøker, så skjer det ingenting akkurat nå, vi bare logger noe til console.
For at brukeren kan navigere til detaljert visning av en bok,
må du først injisere Router-service i constructor:

**Endre koden i src/book-app/books/books.component.ts**
```javascript
    constructor(private bookService: BookService, private router: Router) {
       }
```
La merke at vi trenger **ikke** å endre 'providers' i komponenten,
siden Angular tilbyr denne servicen automatisk til den scopen hvor vår komponent er.
Navigering til detaljer visning er ikke ferdig ennå.

**Endre koden i metoden bookSelected src/book-app/books/books.component.ts**

```javascript
this.router.navigate(['/books', book.id]);
```

Da kan du teste å navigere videre fra bok-listen!


## Oppgave 6 Lifecycle hooks

### Skift til riktig branch
```
git checkout -f oppgave6
```

Angular har ansvaret for å håndtere dine komponenter og dette kommer med diverse hendelser.
Hver komponent som vi lager i Angular har en så kalt *lifecycle*.
Slike hendelser som inngår i komponenten sin lifecycle er oppretting av komponent, oppdatering og sletting.

Ved å implementer spesielle *interfaces* som Angular
tilbyr, kan vi knytte vår egen funksjonalitet til disse hendelser. 

De mest vanlige interfaces er:
* OnInit
* OnDestroy
* OnChanges

For eksempel:
```javascript
class MyComponent implements OnInit { 
    ngOnInit() { 
        console.log('ngOnInit - initializing component.'); 
    }
}
```

### Vis antall bøker på About siden
Ved hjelp av BookService-klassen skal du vise antall bøker i bibliotek.
Her må du bruke OnInit-interfacet.  Vi kunne selvsagt også bare kalle servicen i en constructor til klasse, men det er trygger og bedre å la constructoren bare initialisere attributer til klassen, og gjøre ting som krever mer jobb i ngOnInit-metoden.

**Endre koden etter instruksjoner i filen src/book-app/about/about.component.ts**

## Oppgave 7 Binding til events

### Skift til riktig branch
```
git checkout -f oppgave7
```

Vanlig Angular-applikasjon er et tree av komponenter, hvor data flyter nedover i tree 
oftest via property-binding ved hjelp av @Input-annotering. Når man har behov å 
passe data oppover i komponent-tree, bruker man vanligvis *event binding* med
kustom events. Dette er ikke den eneste måte å passe data oppover i komponentstruktur,
men når man har direkte parent-child relasjon, er dette en grei måte å gjøre det.

I vår applikasjon har vi parent-child relasjon mellom komponenter *Books* og 
*SearchComponent*. Siden Books inkluderer *<search>*-tag i sin template, er
 den parent-komponent, og SearchComponent er child-komponent.
 Når brukeren utfører søk og får resultater, må fi fortelle nå oppover i strukturen
 at vi har noe som vi ville vise til brukeren.
 Dette kan vi oppnå ved å lage vår egen *custome event* og reagere på den.

## 7.1 Lage en custom event for resultater
**Åpne filen src/book-app/search/search-component.ts**
Der skal vi ha vår custom-event som er av type *EventEmitter*.
I tillegg til det må vi annotere det slik at Angular kan registrer den.
Riktig annotasjon her er *@Output()*.

Et eksempel om custom-event:
```javascript
@Output() onMyEvent:EventEmitter<MyPayloadType> = new EventEmitter<MyPayloadType>
```

Siden vi retunerer instanser av Book-klasse fra BookService, er *payload* i dette
tilfelle *en array av bøker*.

## 7.2 Send events fra søkresultater
Åpne filen src/book-app/search/search-component.ts

Når vi har vår egen EventEmitter på plass, må vi sende events på riktige tidspunkter
med den, slik at de komponentene som lytter på oss kan reager på dem.
Disse tidspunktene i vår tilfelle er når vi *har fått søkresultat* og når brukeren
har *skrivet i søkefelt mindre enn 2 tegn*.

## 7.3 Vis resultater ved events i template
**Åpne filen src/book-app/books/books.component.ts**

Da er vår komponent klar til å sende events, og det som gjenstår, er å definere
hvordan vi reagerer på dem i parent-komponent. 
Med andre ord: vi skal *binde på event* i vår parent-komponents template.

F.eks.
```html
<mytag (onMyCustomEvent)='myMethodCall($event)'></mytag>
```
La merke hvordan man viderefører *payload* fra event til metode-kall ved å bruke '$event'-argument.

Da kan du søke bøker og se resultater i bok-lista med en gang vi har noenting å vise!
 
Dette var også siste oppgave, og din applikasjonen er ferdig nå.

**Takk for deltagelse!!**
