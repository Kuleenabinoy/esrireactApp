import React, { useEffect } from "react";
import { loadModules } from "esri-loader";
// import esriConfig from "@arcgis/core/config"; // Import esriConfig
// esriConfig.apiKey = process.env.REACT_APP_ARCGIS_API_KEY;
// console.log(esriConfig.apiKey);
const MapComponent = () => {
    useEffect(() => {
        const createMap = async () => {
           
            try {
                // Load the required Esri modules using esri-loader
                const [Map, MapView, GeoJSONLayer, PopupTemplate] = await loadModules(
                    ["esri/Map", "esri/views/MapView", "esri/layers/GeoJSONLayer", "esri/PopupTemplate"],
                   {
                       css: true,
                       apiKey: process.env.REACT_APP_ARCGIS_API_KEY,                   
                   }
                );
               
                // Fetch GeoJSON data
                const response = await fetch(
                    "https://portal.spatial.nsw.gov.au/geoserver/liveTransport/buses/FeatureServer/0/query?f=geojson"
                );
                const geoJSONData = await response.json();
                console.log("geoJson Data", geoJSONData);

                const geoJSONLayer = new GeoJSONLayer({
                    url: "https://portal.spatial.nsw.gov.au/geoserver/liveTransport/buses/FeatureServer/0/query?f=geojson",
                    popupTemplate: new PopupTemplate({
                        title: "{id}",
                        content: `
                          <b>Hash ID:</b> {hashId}<br>
                          <b>Start Time:</b> {vehicle.trip.startTime}<br>
                          <b>Start Date:</b> {vehicle.trip.startDate}<br>
                          <b>Latitude:</b> {vehicle.position.latitude}<br>
                          <b>Longitude:</b> {vehicle.position.longitude}<br>
                          <b>Speed:</b> {vehicle.position.speed}<br>
                          <b>Compass:</b> {vehicle.position.compass}<br>
                          <b>Route ID:</b> {vehicle.trip.routeId}<br>
                          <b>Occupancy Status:</b> {vehicle.occupancyStatus}
                        `,
                    }),
                });
                const map = new Map({
                    basemap: "streets-vector",
                    // basemap: "topo-vector",
                    // basemap: "satellite",
                });

                // Create the map view
                const view = new MapView({
                    container: "map-view",
                    map: map,
                    center: [151.2093, -33.8688], // Sydney coordinates
                    zoom: 10,
                });
                map.add(geoJSONLayer);
            } catch (error) {
                console.error("Error loading the Esri modules:", error);
            }
        };

        createMap();      
    }, []);
    return <div className="map-container"></div>;
};

export default MapComponent;
