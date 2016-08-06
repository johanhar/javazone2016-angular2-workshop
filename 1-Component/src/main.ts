import { bootstrap } from '@angular/platform-browser-dynamic';
import { HelloWorld } from './app/helloworld';

/* Webpack will automatically insert a <link> to index.html with the correct href after bundling is done  */
import './styles.css';

bootstrap(HelloWorld, []);
