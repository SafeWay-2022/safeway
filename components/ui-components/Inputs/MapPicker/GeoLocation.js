import { AimOutlined } from '@ant-design/icons';
import { Button, Drawer, Input, Tooltip } from 'antd';
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';

const MapDrawerNoSSR = dynamic(() => import('./MapDrawer'), {
  ssr: false,
});

function GeoLocation({ value, onChange = () => {}, readonly, label }) {
  const { lat, lg, type } = value;
  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);

  const handleChange = (key) => (value) => {
    const position = { lat, lg };
    return onChange({ ...position, [key]: value, type });
  };

  const inputProps = readonly
    ? { bordered: false, disabled: false, readOnly: true, allowClear: false }
    : { allowClear: true };

  return (
    <>
      <Input.Group>
        <Input
          type="number"
          value={lat}
          onChange={(e) => handleChange('lat')(e.target.value)}
          style={{ width: 'calc(50% - 17px)' }}
          {...inputProps}
          placeholder={readonly ? '' : 'Enter latitude'}
        />
        <Input
          type="number"
          value={lg}
          onChange={(e) => handleChange('lg')(e.target.value)}
          style={{ width: 'calc(50% - 17px)' }}
          {...inputProps}
          placeholder={readonly ? '' : 'Enter longitude'}
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
                ? `Drag the marker around`
                : 'Press "edit" in actions column to change the position.'}
            </span>
            <p style={{ fontSize: '0.85em' }}>
              {!readonly
                ? `Latitude and Longitude are changed according to the marker position. Close the map to see the updates (Escape/Cross/Click outside).`
                : ''}
            </p>
          </div>
        }
        placement="top"
        visible={isVisibleDrawer}
        onClose={() => setIsVisibleDrawer(false)}
        size="large"
        style={{ position: 'absolute' }}
      >
        <MapDrawerNoSSR
          center={[lat, lg]}
          readonly={readonly}
          updatePosition={({ lat, lng }) => onChange({ lat, lg: lng, type })}
        />
      </Drawer>
    </>
  );
}

export default GeoLocation;
