import GeoLocation from './MapPicker/GeoLocation';
import InputEmail from './InputEmail';
import InputText from './InputText';
import InputPhone from './InputPhone';
import SelectMultiple from './SelectMultiple';
import SelectCountry from './SelectCountry';
import InputCheckbox from './InputCheckbox';

export const inputsMapping = {
  string: InputText,
  email: InputEmail,
  geo: GeoLocation,
  latilong: GeoLocation,
  phone: InputPhone,
  country: SelectCountry,
  MULTIPLE_SELECT: SelectMultiple,
  boolean: InputCheckbox,
};

export const pureValueTypes = ['MULTIPLE_SELECT', 'geo', 'country', 'boolean'];
