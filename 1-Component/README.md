# Oppgave 1 - Component
Dette er din første oppgave. Før vi begynner må du huske å ha:
 - bla bla
 - bla bla

## "Bok app"
Skriv litt om hva vi skal lage, en bok-app

## 1.1 - Vår første component
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
Selve logikken til en Component legger vi i klassen. Her kan vi ha variabler og funksjoner som blir tilgjengelige for view/template. Dette gjør at appen vår blir interaktiv for brukeren. Det som skjer når brukeren trykker på en knapp i Component sitt view kan man legge i klassen. Mer om dette senere.

### **Opprett appens rot-komponent**
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

## 1.2 - Bootstrap appen
En Angular applikasjon må bootstrappes med rot-komponenten. Dette gjør at `index.html` kan ta i bruk `<book-app>` elementet.

### **Rediger følgende filer**

**/src/main.ts**
```javascript
import { bootstrap } from '@angular/platform-browser-dynamic';
import { BookApp } from './book-app/book-app.component';

/* Webpack will automatically insert a <link> to index.html with the correct href after bundling is done  */
import './styles.css';

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

## 1.3 - Kjør appen
La oss teste endringene vi har gjort til nå.

Kjør følgende script terminalen:

```
npm start
```

Åpne en nettleser: [http://localhost:8080](http://localhost:8080)

### Feilsøking
Hva kan gå galt, skriv noe om det her ...

## 1.4 - Osv ...

# Neste oppgave
Neste oppgave finner du i et eget prosjekt.
Du kan nå lukke dette prosjektet i din IDE og åpne prosjektet for oppgave 2.

[Oppgave 2 - Name](www.vg.no)
