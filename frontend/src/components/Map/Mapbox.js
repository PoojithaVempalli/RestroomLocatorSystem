import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import "../Maps.css";
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import RefreshIcon from '@mui/icons-material/Refresh';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

const Maps = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); // Added reference to store the map instance
  const directionsRef = useRef(null); 
  const markerRef = useRef(null);// Reference for directions instance

  // Your Mapbox access token
  mapboxgl.accessToken = 'pk.eyJ1IjoibmFhdXNlcm5hbWUiLCJhIjoiY2x0ZHRzdzhnMDZ4azJrcGp0aTNveHNiOSJ9.KMIfvVh_a3LxYGs8c4vHyw';

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-97.1526, 33.2075], // University of North Texas coordinates
      zoom: 12,
    });

    mapRef.current = map; // Store the map instance for later use

    // Initialize directions control
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/cycling',
    });

    directionsRef.current = directions; // Store the directions instance for later use

    map.addControl(directions, 'top-left');

    // const geocoder = new MapboxGeocoder({
    //   accessToken: mapboxgl.accessToken,
    //   mapboxgl: mapboxgl,
    //   marker: false, // Do not automatically place a default marker
    // });

    // map.addControl(geocoder, 'top-right');

    // // Event listener for placing a marker on search result
    // geocoder.on('result', (e) => {
    //   // Create a marker and add it to the map
    //   new mapboxgl.Marker()
    //     .setLngLat(e.result.geometry.coordinates)
    //     .addTo(map);
    // });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false, // Do not automatically place a default marker
    });

    map.addControl(geocoder, 'top-right');

    // Event listener for placing a marker on search result
    geocoder.on('result', (e) => {
      // Remove the previous marker if it exists
      if (markerRef.current) {
        markerRef.current.remove();
      }
      
      // Create a new marker and add it to the map
      markerRef.current = new mapboxgl.Marker()
        .setLngLat(e.result.geometry.coordinates)
        .addTo(map);
    });

    return () => map.remove();
  }, []);

  const zoomIn = () => {
    mapRef.current.zoomIn();
  };

  const zoomOut = () => {
    mapRef.current.zoomOut();
  };

  const goToMyLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      mapRef.current.flyTo({
        center: [position.coords.longitude, position.coords.latitude],
        zoom: 14,
      });
    });
  };

  const refreshMap = () => {
    mapRef.current.flyTo({
      center: [-97.1526, 33.2075], // University of North Texas coordinates
      zoom: 12,
    });
  };

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: '95%', height: '70vh' }} className='maps-container'/>
      <div className="button-container">
        <button className="neo-button" onClick={zoomIn}><ZoomInIcon /></button>
        <button className="neo-button" onClick={zoomOut}><ZoomOutIcon /></button>
        <button className="neo-button" onClick={goToMyLocation}><MyLocationIcon/></button>
        <button className="neo-button" onClick={refreshMap}><RefreshIcon /></button>
      </div>
    </div>
  );
};

export default Maps;
