import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

const Map = ({ center = [42, 42], updatePosition, readonly, label }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    map && map.flyTo(center);
  }, [center]);

  return (
    <MapContainer
      center={center}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
      ref={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerWrapper
        position={center}
        draggable={!readonly}
        updatePosition={updatePosition}
      ></MarkerWrapper>
    </MapContainer>
  );
};

export default Map;

function MarkerWrapper({ position, updatePosition, setPosition, draggable }) {
  const map = useMap();
  const markerRef = useRef(null);
  return (
    <div>
      <Marker
        animate={true}
        ref={markerRef}
        position={position}
        draggable={draggable}
        eventHandlers={{
          click: (e) => {
            map.flyTo(e.latlng, 14);
          },
          dragend() {
            const marker = markerRef.current;
            if (marker != null) {
              map.flyTo(marker.getLatLng());
              updatePosition(marker.getLatLng());
            }
          },
        }}
      ></Marker>
    </div>
  );
}
