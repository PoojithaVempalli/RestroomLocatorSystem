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
  const [handicapAvailable, setHandicapAvailable] = useState(false);
  const [babyChangingStationAvailable, setBabyChangingStationAvailable] = useState(false);
  const [rating, setRating] = useState('5');
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); 
  const directionsRef = useRef(null); 
  const markerRef = useRef(null);

  // Function to handle changes in rating
  const handleRatingChange = useCallback((event) => {
    setRating(event.target.value);
  }, []);

  // Function to handle filter submission
  const handleFilterSubmit = useCallback(() => {
    // Logic In progress.. 
  }, [handicapAvailable, babyChangingStationAvailable, rating]);

  
  // Mapbox access token
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
      <div>
            <h2>Filters</h2>
            <label>
              <input
                type="checkbox"
                checked={handicapAvailable}
                onChange={() => setHandicapAvailable(!handicapAvailable)}
              />
              Handicap Accessible
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                checked={babyChangingStationAvailable}
                onChange={() => setBabyChangingStationAvailable(!babyChangingStationAvailable)}
              />
              Baby Changing Station
            </label>
            <br />
            <label>
              Rating:
              <select value={rating} onChange={handleRatingChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>
            <br />
            <button onClick={handleFilterSubmit} >Submit</button>
          </div>
        </PopupBody>
      </BasePopup>
      </div>
      {selectedRestroom && (
        <div className="map-control" style={{ marginTop: '45px' }}>
          <h3>{selectedRestroom.name}</h3>
          <p>Rating : {selectedRestroom.rating} 🌟 / 5</p>
          <p>Availablity : {selectedRestroom.available}</p>
          <p>Baby Changing Station : {selectedRestroom.babyChangingStation}</p>
          <p>Handicap Availablity : {selectedRestroom.handicap}</p>
          <p>{selectedRestroom.descriptionMon}</p>
          <p>{selectedRestroom.descriptionTue}</p>
          <p>{selectedRestroom.descriptionWed}</p>
          <p>{selectedRestroom.descriptionThu}</p>
          <p>{selectedRestroom.descriptionFri}</p>
          <p>{selectedRestroom.descriptionSat}</p>
          <p>{selectedRestroom.descriptionSun}</p>

        </div>
      )}

    </div>
  
    </div>
  );
};

export default Maps;
