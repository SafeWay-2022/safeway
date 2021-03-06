import { nanoid } from 'nanoid';
import { lettersOnly } from '../../../utils/common';

export const defaultGeolocationProps = { lg: undefined, lat: undefined, type: null };

export const mapGeoToInputProps = (geo) => {
  if (!geo) return defaultGeolocationProps;

  return {
    lg: geo.coordinates[0],
    lat: geo.coordinates[1],
    type: geo.type,
  };
};

export const mapLatilongToInputProps = (latilong) => {
  if (!latilong) return defaultGeolocationProps;

  return {
    lat: latilong[0],
    lg: latilong[1],
    type: null,
  };
};

export const mapInputPropsToGeo = ({ lg, lat, type }) => ({
  coordinates: [lg, lat],
  type,
});

export const mapInputPropsToServerLatilong = ({ lg, lat, type }) => [+lat, +lg];

export const mapServerRowToUIRow = (dataRow) => ({
  key: dataRow._id ? dataRow._id : nanoid(),
  ...dataRow,
  geo: mapGeoToInputProps(dataRow.geo),
});

export const mapServerTableToUIData = (data) => data.map(mapServerRowToUIRow);

export const mapUIRowToServerData = (data, route) => {
  let changes = { key: undefined, _id: undefined };

  if (route.includes('poi')) {
    changes = {
      ...changes,
      latilong: mapInputPropsToServerLatilong(data.geo),
      geo: undefined,
    };
  }

  if (route.includes('users')) {
    changes = { ...changes, username: `${lettersOnly(data.name)}_${nanoid(8)}` };
  }

  return { ...data, ...changes };
};

export const NEW_RECORD_KEY = 'add_new_record';
export const getAddNewRowUIData = (fields) => ({
  _id: NEW_RECORD_KEY,
  key: NEW_RECORD_KEY,
  ...Object.fromEntries(
    fields.map(({ dataIndex }) => {
      let defaultValue = null;
      if (dataIndex === 'geo') {
        defaultValue = defaultGeolocationProps;
      }
      return [dataIndex, defaultValue];
    }),
  ),
});
export const changingData = (data) => {
  const result = data.map(e => {
    if (e.distance_km) {
      return { ...e, distance_km: Number(e.distance_km).toFixed(3) }
    } else {
      return e
    }

  })
  return result
}