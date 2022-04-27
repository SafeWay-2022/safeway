import { useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

const Map = ({ center = [42, 42], updatePosition, readonly, label }) => {
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(center);
  const eventHandlers = useMemo(
    () => ({
      click() {
        map.locate();
        map.flyTo(e.latlng, map.getZoom());
        setMarkerPosition(e.latlng);
      },
      locationfound(e) {},
    }),
    [],
  );

  //   const map = useMapEvents({
  //     click() {
  //       map.locate()
  //     },
  //     locationfound(e) {
  //       setPosition(e.latlng)
  //       map.flyTo(e.latlng, map.getZoom())
  //     },
  //     dragend() {
  //         const marker = markerRef.current;
  //         if (marker != null) {
  //           setPosition(marker.getLatLng());
  //         }
  //       }
  //   })

  return (
    <MapContainer
      center={center}
      zoom={14}
      scrollWheelZoom={false}
      eventHandlers={eventHandlers}
      style={{ height: '100%', width: '100%' }}
      ref={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Markerwhatever
        position={markerPosition}
        draggable={!readonly}
        updatePosition={updatePosition}
        setPosition={setMarkerPosition}
      >
        <Popup>Hey ! I live here {readonly}</Popup>
      </Markerwhatever>
    </MapContainer>
  );
};

export default Map;

function Markerwhatever({ position, updatePosition, setPosition, draggable }) {
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
              setPosition(marker.getLatLng());
              updatePosition(marker.getLatLng());
            }
          },
        }}
      ></Marker>
    </div>
  );
}
