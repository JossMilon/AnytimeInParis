//Importing packages
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Box, Toolbar } from '@mui/material';

const Map = ({ locations }) => {
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100vh", padding: "0" }}>
        <Toolbar />
        <MapContainer
          style={{ height: "100%" }}
          center={[48.8924960, 2.3440200]}
          zoom={15}
          scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          {locations.map((location, index) => {
            return (
              <Marker key={location.properties.location_id} position={[location.geography.coordinates[0], location.geography.coordinates[1]]}>
                <Popup>
                  <p>{location.properties.name}</p>
                  <p>{location.properties.description}</p>
                  <p>Latitude: {location.geography.coordinates[0]}</p>
                  <p>Latitude: {location.geography.coordinates[1]}</p>
                </Popup>
              </Marker> 
            )
          })}
        </MapContainer>
      </Box>
    )
};

export default Map;