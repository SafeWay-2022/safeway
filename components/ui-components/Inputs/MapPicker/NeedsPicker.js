/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import {
    MapContainer,
    Marker,
    TileLayer,
    Popup,
    Circle,
    useMapEvents
} from 'react-leaflet';


function MyComponent({ setLimit }) {
    const [zoomLevel, setZoomLevel] = useState(14);

    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom());
        },
    });


    useEffect(() => {
        if (zoomLevel >= 14) {
            setLimit(10)
        } else if (zoomLevel >= 13) {
            setLimit(20)
        } else if (zoomLevel === 12) {
            setLimit(50)
        } else if (zoomLevel < 12) {
            setLimit(100)
        }
        return () => setLimit(10)
    }, [zoomLevel])

    return null
}


const MapPicker = ({ list, value, setLimit, refetch, }) => {
    const [map, setMap] = useState(null);

    const center = !value.length > 0 ? { lat: list[0]?.geo.lat, lng: list[0]?.geo.lg } : { lat: value.lat, lng: value.lg }
    useEffect(() => {
        map && map?.flyTo(center);
    }, [center]);
    return (
        <MapContainer
            ref={setMap}
            style={{ height: "900px" }}
            center={center}
            zoom={14}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MyComponent setLimit={setLimit} />

            {list?.map((elem, i) => {
                return (
                    <Marker
                        key={elem.key}
                        position={{ lat: elem.geo.lat, lng: elem.geo.lg }}
                    >
                        <Popup closeButton={false}>
                            <div>{elem.category}</div>
                            <div>{elem.description}</div>
                            <div>{elem.country}</div>
                        </Popup>
                        <Circle
                            center={{ lat: elem.geo.lat, lng: elem.geo.lg }}
                            radius={200} />
                    </Marker>
                )
            })}
        </MapContainer>
    )
}

export default MapPicker