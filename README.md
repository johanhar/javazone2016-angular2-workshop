# JavaZone 2016
## TypeScript og Angular2 workshop

I denne workshoppen skal vi lage en applikasjon for å håndtere et bibliotek av bøker.

## Før du begynner
 - `npm install`
 - `etc`

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

## Oppgave 1.1 - Vår første component
### Opprett appens rot-komponent
Angular er som sagt et tre av komponenter, vi starter med å opprette selve roten som igjen vil bruke andre komponenter.

La oss kalle den noe så enkelt som `BookApp`.

**/src/book-app/book-app.component.ts**
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

## Oppgave 1.3 - Navbar
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
  inputs: ['product'],
  host: {'class': 'item'},
  directives: [ProductImage, ProductDepartment, PriceDisplay],
  template: `
  <product-image [product]="product"></product-image>
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

**Rediger /src/main.ts**
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

**Ta i bruk RouterOutlet i /src/book-app/book-app.component.ts**
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

**Ta i bruk RouterLink i /src/book-app/navbar.component.ts**
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

## Oppgave 3 - Template bindings

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

**/src/book-app/about/about.component.ts**
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

## Oppgave 4 - Forms

## 4.1 Binding og NgModel
## 4.2 Validering
## 4.3 Visualisering av validering

## Oppgave 5 - Http og Observables

