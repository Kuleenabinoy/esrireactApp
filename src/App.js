import React from "react";
import "./App.css";
import MapComponent from "./Components/MapComponent";
const App = () => {
    return (
        <div>
            <h1 className="map-heading">Custom Map with GeoJSON Layer</h1>
            <div id="map-view" className="map-view">
                <MapComponent />
            </div>
        </div>
    );
};
export default App;
