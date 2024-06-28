import { InjectionToken } from '@angular/core';

export interface ApplicationConfig {
    apiUrl: string;
    providers?: any[];
}

export const APP_CONFIG = new InjectionToken<ApplicationConfig>('app.config');
