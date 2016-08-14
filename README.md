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
Hvis du kommer fra Angular 1 har du sikkert hørt om Directive. Angular 2 bruker fortsatt begrepet direktiv, det er nemlig sånn at Component er en subtype av Directive. Det finnes flere typer direktiv, hvor komponent er en av typene.

Før man kan bruke andre direktiver og komponenter må man fortelle Angular om dette. Dette kan gjøres i metadata/annotation til komponenten.

```javascript
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

 

[Oppgave 2 - Name](www.vg.no)
