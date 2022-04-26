import { AimOutlined } from '@ant-design/icons';
import { Button, Input, Tooltip, Drawer } from 'antd';
import React, { useState, useEffect } from 'react';
import { mapInputPropsToGeo } from '../config';
import MapDrawer from './MapDrawer';

function GeoLocation({ lat = '', lg = '', type = 'Point', onChange = () => {}, readonly }) {
  const readonlyProps = readonly
    ? { bordered: false, disabled: false, readOnly: true, allowClear: false }
    : {};

  const inputProps = { allowClear: true };
  const [localValue, setLocalValue] = useState({ lat, lg });
  const { lat: localLat, lg: localLg } = localValue;

  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);

  const handleLatChange = (e) => {
    setLocalValue({ ...localValue, lat: e.target?.value });
  };

  const handleLgChange = (e) => {
    setLocalValue({ ...localValue, lg: e.target?.value });
  };

  useEffect(() => {
    onChange(mapInputPropsToGeo({ lg: localLg, lat: localLat, type }));
  }, [localLat, localLg]);

  useEffect(() => {
    setLocalValue({ lat, lg });
  }, [lat, lg]);

  return (
    <>
      <Input.Group>
        <Input
          type="number"
          defaultValue={localLat}
          onChange={handleLatChange}
          style={{ width: 'calc(50% - 17px)' }}
          {...inputProps}
          {...readonlyProps}
          placeholder={readonly ? '' : 'Enter latitude'}
        />
        <Input
          type="number"
          defaultValue={localLg}
          onChange={handleLgChange}
          style={{ width: 'calc(50% - 17px)' }}
          {...inputProps}
          {...readonlyProps}
          placeholder={readonly ? '' : 'Enter longtitude'}
        />
        <Tooltip title="select on the map">
          <Button onClick={() => setIsVisibleDrawer(true)} icon={<AimOutlined />} />
        </Tooltip>
      </Input.Group>
      <Drawer
        title="Select place on the map"
        placement="top"
        visible={isVisibleDrawer}
        onClose={() => setIsVisibleDrawer(false)}
        style={{ position: 'absolute' }}
      >
        <p>
          There goes the map. Center it at: <br />
          lat: {lat}, lg: {lg}
        </p>
        <MapDrawer center={{ lat, lg }} />
      </Drawer>
    </>
  );
}

export default GeoLocation;
