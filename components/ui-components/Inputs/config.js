import GeoLocation from './MapPicker/GeoLocation';
import InputEmail from './InputEmail';
import InputText from './InputText';
import InputPhone from './InputPhone';
import SelectCountry from './SelectCountry';
import { mapGeoToInputProps, mapInputPropsToGeo, mapLatilongToInputProps, mapInputPropsToLatilong } from './mappers';

export const inputsMapping = {
  string: InputText,
  email: InputEmail,
  geo: GeoLocation,
  latilong: GeoLocation,
  phone: InputPhone,
  country: SelectCountry
};

export const toComponentPropsMappers = {
  string: (text) => text,
  email: (text) => text,
  phone: (text) => text,
  country: (text) => text,
  geo: mapGeoToInputProps,
  latilong: mapLatilongToInputProps
};

export const fromComponentPropsMappers = {
  string: (text) => text,
  email: (text) => text,
  phone: (text) => text,
  country: (text) => text,
  geo: mapInputPropsToGeo,
  latilong: mapInputPropsToLatilong
};
