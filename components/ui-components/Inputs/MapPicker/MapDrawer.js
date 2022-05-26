import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';

const Map = ({ center, updatePosition, readonly, label }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    map && map.flyTo(center);
  }, [...center]);

  useEffect(() => {
    if (readonly) return;
    if (!map) return;

    map.on('dblclick', (e) => {
      updatePosition(e.latlng);
    });
  }, [readonly, map]);

  return (
    <MapContainer
      center={center}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
      ref={setMap}
      doubleClickZoom={readonly}
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
