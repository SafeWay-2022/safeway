import GeoLocation from './MapPicker/GeoLocation';
import InputEmail from './InputEmail';
import InputText from './InputText';
import InputPhone from './InputPhone';

export const inputsMapping = {
  string: InputText,
  email: InputEmail,
  geo: GeoLocation,
  phone: InputPhone,
};

export const defaultGeo = { lg: '', lat: '', type: null };
export const mapGeoToInputProps = (geo) => {
  if (!geo) return defaultGeo;

  return {
    lg: geo.coordinates[0],
    lat: geo.coordinates[1],
    type: geo.type,
  };
};

export const mapInputPropsToGeo = ({ lg, lat, type }) => ({
  coordinates: [lg, lat],
  type,
});

export const dataMappers = {
  string: (text) => text,
  email: (text) => text,
  phone: (text) => text,
  geo: mapGeoToInputProps,
};
