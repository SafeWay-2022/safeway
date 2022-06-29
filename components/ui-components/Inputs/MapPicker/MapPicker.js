import { useState, useEffect } from 'react';
import {
    MapContainer,
    Marker,
    TileLayer,
    Popup,
    Circle,
    useMapEvents
} from 'react-leaflet';

const MapPicker = ({ list, value }) => {
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
            onZoomlevelschange={(e) => { console.log(e) }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {list?.map((elem, i) => {
                return (
                    <Marker
                        key={elem.key}
                        position={{ lat: elem.geo.lat, lng: elem.geo.lg }}>
                        <Popup>
                            <span>
                                {elem?.name && <> Name: {elem?.name}<br /></>}
                                {elem?.address && <> Address: {elem?.address}<br /></>}
                                {elem?.distance_km && <> Distance: {Number(elem.distance_km).toFixed(3)} km<br /></>}
                                {elem?.phone && <> Phone: {elem.phone}<br /></>}
                                {elem?.telegram && <> Telegram: {elem.telegram}<br /></>}
                                {elem?.whatsapp && <> Whatsapp: {elem.whatsapp}<br /></>}
                                {elem?.categories.length > 0 &&
                                    <div style={{ display: 'flex' }}>
                                        Categories:
                                        <ul>
                                            {elem.categories.map((elem, i) => {
                                                return (<li key={i}>{elem}</li>)

                                            })}
                                        </ul>
                                    </div>}
                            </span>
                        </Popup>
                        <Circle
                            center={{ lat: elem.geo.lat, lng: elem.geo.lg }}
                            fillColor="blue"
                            radius={200} />
                    </Marker>
                )
            })}
        </MapContainer>
    )
}

export default MapPicker