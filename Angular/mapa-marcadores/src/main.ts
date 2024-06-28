import { bootstrapApplication } from '@angular/platform-browser';
import { APP_CONFIG } from './app/app.config'; 
import { ApplicationConfig } from './app/app.config'; 
import { AppComponent } from './app/app.component';

const config: ApplicationConfig = {
    apiUrl: 'http://localhost:3000/api' ,
    providers: [
        { provide: APP_CONFIG, useValue: null }
    ]};

bootstrapApplication(AppComponent, {
    providers: [
        { provide: APP_CONFIG, useValue: config }
    ]
}).catch((err) => console.error(err));
