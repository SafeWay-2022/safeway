import { AimOutlined } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd';
import React, { useState, useEffect } from 'react';
import { mapInputPropsToGeo } from '../config';

function GeoLocation({ lat = '', lg = '', type = 'Point', onChange = () => {}, readonly }) {
  const readonlyProps = readonly
    ? { bordered: false, disabled: false, readOnly: true, allowClear: false }
    : {};

  const inputProps = { allowClear: true };
  const [localValue, setLocalValue] = useState({ lat, lg });
  const { lat: localLat, lg: localLg } = localValue;

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
    <Input.Group>
      <Input
        type="number"
        defaultValue={localLat}
        onChange={handleLatChange}
        style={{ width: 'calc(50% - 17px)' }}
        {...inputProps}
        {...readonlyProps}
        placeholder="latitude..."
      />
      <Input
        type="number"
        defaultValue={localLg}
        onChange={handleLgChange}
        style={{ width: 'calc(50% - 17px)' }}
        {...inputProps}
        {...readonlyProps}
        placeholder="longtitude..."
      />
      <Tooltip title="select on the map">
        <Button icon={<AimOutlined />} />
      </Tooltip>
    </Input.Group>
  );
}

export default GeoLocation;
