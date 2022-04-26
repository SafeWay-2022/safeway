import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({center, readonly}) => {
    return (
      <MapContainer
        center={center}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer
         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"      />
        <Marker position={center} draggable={!readonly} animate={true}>
          <Popup>Hey ! I live here {readonly}</Popup>
        </Marker>
      </MapContainer>
    );
  };
  
  export default Map;
  