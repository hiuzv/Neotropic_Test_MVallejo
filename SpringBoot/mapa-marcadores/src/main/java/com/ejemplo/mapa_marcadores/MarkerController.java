package com.ejemplo.mapa_marcadores;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/markers")
@CrossOrigin(origins = "http://localhost:4200")
public class MarkerController {
    @Autowired
    private MarkerService markerService;

    @GetMapping
    public List<Marker> getAllMarkers() {
        return markerService.getAllMarkers();
    }

    @GetMapping("/{id}")
    public Marker getMarkerById(@PathVariable Long id) {
        return markerService.getMarkerById(id);
    }

    @PostMapping
    public Marker createMarker(@RequestBody Marker marker) {
        return markerService.saveMarker(marker);
    }

    @PutMapping("/{id}")
    public Marker updateMarker(@PathVariable Long id, @RequestBody Marker marker) {
        Marker existingMarker = markerService.getMarkerById(id);
        if (existingMarker != null) {
            existingMarker.setName(marker.getName());
            existingMarker.setDescription(marker.getDescription());
            existingMarker.setLatitude(marker.getLatitude());
            existingMarker.setLongitude(marker.getLongitude());
            return markerService.saveMarker(existingMarker);
        } else {
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public void deleteMarker(@PathVariable Long id) {
        markerService.deleteMarker(id);
    }
}
