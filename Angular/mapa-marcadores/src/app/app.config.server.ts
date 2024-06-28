import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mapa-marcadores';
}
export const config = {
  apiUrl: 'http://localhost:3000/api',
};
