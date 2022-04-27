import { AimOutlined } from '@ant-design/icons';
import { Button, Drawer, Input, Tooltip } from 'antd';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { mapInputPropsToGeo } from '../config';

const MapDrawerNoSSR = dynamic(() => import('./MapDrawer'), {
  ssr: false,
});

function GeoLocation({ lat = '', lg = '', type = 'Point', onChange = () => {}, readonly, label }) {
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
        title={
          <div>
            Place selection:{' '}
            <span style={{ fontWeight: 'normal' }}>
              {!readonly
                ? 'Drag the marker around to change the coordinates.'
                : 'Press "edit" in actions column to change the position.'}
            </span>
          </div>
        }
        placement="top"
        visible={isVisibleDrawer}
        onClose={() => setIsVisibleDrawer(false)}
        size="large"
        style={{ position: 'absolute' }}
      >
        <MapDrawerNoSSR
          center={[localLat, localLg]}
          readonly={readonly}
          updatePosition={({ lat, lng }) => setLocalValue({ lat, lg: lng })}
        />
      </Drawer>
    </>
  );
}

export default GeoLocation;
