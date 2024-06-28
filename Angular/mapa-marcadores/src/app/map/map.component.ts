import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

interface Marker {
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
}

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styles: [`
    .map-container {
      height: 600px;
    }
    /* Otros estilos específicos del componente */
    `]
})
export class MapComponent implements OnInit {
    private map!: L.Map;
    markers: Marker[] = [];
    selectedMarker!: Marker;

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.initMap();
        this.loadMarkers();
    }

    private initMap(): void {
        this.map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        this.map.on('click', (e: any) => {
            const marker: Marker = {
                id: 0,
                name: 'Nuevo Marcador',
                description: '',
                latitude: e.latlng.lat,
                longitude: e.latlng.lng
            };
            this.addMarker(marker);
        });
    }

    private loadMarkers(): void {
        this.http.get<Marker[]>('http://localhost:8080/api/markers')
            .subscribe(data => {
                this.markers = data;
                this.markers.forEach(marker => this.createMarker(marker));
            });
    }

    private addMarker(marker: Marker): void {
        this.http.post<Marker>('http://localhost:8080/api/markers', marker)
            .subscribe(newMarker => {
                this.markers.push(newMarker);
                this.createMarker(newMarker);
            });
    }

    private createMarker(marker: Marker): void {
        const leafletMarker = L.marker([marker.latitude, marker.longitude])
            .addTo(this.map)
            .bindPopup(marker.name)
            .on('click', () => {
                this.selectedMarker = marker;
            });
    }

    updateMarker(): void {
        this.http.put<any>(`http://localhost:8080/api/markers/${this.selectedMarker.id}`, this.selectedMarker)
            .subscribe(updatedMarker => {
                const index = this.markers.findIndex(m => m.id === updatedMarker.id);
                if (index !== -1) {
                    this.markers[index] = updatedMarker;
                }
            });
    }
}
