import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { APP_CONFIG, ApplicationConfig } from './app/app.config';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, {
    providers: [
        { provide: APP_CONFIG, useValue: config }
    ]
});

export default bootstrap;
