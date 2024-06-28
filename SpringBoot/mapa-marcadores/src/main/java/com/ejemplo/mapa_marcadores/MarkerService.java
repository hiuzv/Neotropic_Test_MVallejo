package com.ejemplo.mapa_marcadores;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MarkerService {
    @Autowired
    private MarkerRepository markerRepository;

    public List<Marker> getAllMarkers() {
        return markerRepository.findAll();
    }

    public Marker getMarkerById(Long id) {
        return markerRepository.findById(id).orElse(null);
    }

    public Marker saveMarker(Marker marker) {
        return markerRepository.save(marker);
    }

    public void deleteMarker(Long id) {
        markerRepository.deleteById(id);
    }
}
