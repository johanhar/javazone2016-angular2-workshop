import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent } from './app/app.component';

if (process.env.ENV === 'production') {
  enableProdMode();
}

/* Webpack will automatically insert a <link> to index.html with the correct href after bundling is done  */
import './styles.css';

bootstrap(AppComponent, []);
