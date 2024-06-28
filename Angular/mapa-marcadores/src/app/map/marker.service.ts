import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Marker {
    id: number;
    name: string;
    description: string;
    latitude: number;
    longitude: number;
}

@Injectable({
    providedIn: 'root'
})
export class MarkerService {
    private apiUrl = 'http://localhost:8080/api/markers';

    constructor(private http: HttpClient) { }

    getMarkers(): Observable<Marker[]> {
        return this.http.get<Marker[]>(this.apiUrl);
    }

    getMarker(id: number): Observable<Marker> {
        return this.http.get<Marker>(`${this.apiUrl}/${id}`);
    }

    createMarker(marker: Marker): Observable<Marker> {
        return this.http.post<Marker>(this.apiUrl, marker);
    }

    updateMarker(marker: Marker): Observable<Marker> {
        return this.http.put<Marker>(`${this.apiUrl}/${marker.id}`, marker);
    }

    deleteMarker(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
