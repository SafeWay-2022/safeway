import { AimOutlined } from '@ant-design/icons';
import { Button, Drawer, Input, Tooltip, Typography } from 'antd';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const MapDrawerNoSSR = dynamic(() => import('./MapDrawer'), {
  ssr: false,
});

const defaultCoord = [52.214, 21.027];

function GeoLocation({ value, onChange = () => {}, readonly, label }) {
  const [valueBeforeDrawerOpen, setValueBeforeDrawerOpen] = useState({ lat, lg });
  const { lat, lg, type } = value;
  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);

  const handleChange = (key) => (value) => {
    const position = { lat, lg };
    return onChange({ ...position, [key]: value, type });
  };

  const inputProps = readonly ? { bordered: false, disabled: false, readOnly: true } : {};

  const changeToPreviousValue = () => {
    onChange({ ...valueBeforeDrawerOpen, type });
  };

  const handleDrawerOpen = () => {
    setValueBeforeDrawerOpen({ lat, lg });
    setIsVisibleDrawer(true);
  };

  const drawerTitle = (
    <div>
      <p style={{ fontWeight: 'normal' }}>
        {!readonly
          ? ` Info: Drag the marker around`
          : 'Press "edit" in actions column to change the position.'}
      </p>
      <p style={{ fontSize: '0.85em' }}>
        {!readonly
          ? `Latitude and Longitude are changed according to the marker position. Press cancel to restore geolocation value before the changes.`
          : ''}
      </p>
    </div>
  );

  const selectionControls = readonly ? (
    <Typography.Link
      onClick={() => {
        setIsVisibleDrawer(false);
      }}
    >
      Cancel
    </Typography.Link>
  ) : (
    <span>
      <Typography.Link
        onClick={() => setIsVisibleDrawer(false)}
        style={{ marginRight: 8 }}
        disabled={!(lat && lg)}
      >
        Select
      </Typography.Link>
      <Typography.Link
        onClick={() => {
          changeToPreviousValue();
          setIsVisibleDrawer(false);
        }}
      >
        Cancel
      </Typography.Link>
    </span>
  );

  const mapCenter = lat && lg ? [lat, lg] : defaultCoord;

  return (
    <>
      <div
        className="grid grid-rows-2 grid-flow-col gap-2 2xl:grid-rows-1"
        style={{ minWidth: '260px' }}
      >
        <Input
          className="row-span-1"
          type="number"
          value={lat}
          onChange={(e) => handleChange('lat')(e.target.value)}
          {...inputProps}
          placeholder={readonly ? '' : 'Enter latitude'}
        />
        <Input
          className="row-span-1"
          type="number"
          value={lg}
          onChange={(e) => handleChange('lg')(e.target.value)}
          {...inputProps}
          placeholder={readonly ? '' : 'Enter longitude'}
        />
        <Tooltip title="select on the map">
          <Button
            className="row-span-2 2xl:row-span-1"
            onClick={handleDrawerOpen}
            icon={<AimOutlined className="p-1" />}
          />
        </Tooltip>
      </div>
      <Drawer
        title={drawerTitle}
        placement="left"
        visible={isVisibleDrawer}
        closable={false}
        maskClosable={readonly}
        onClose={() => setIsVisibleDrawer(false)}
        size="large"
        style={{ position: 'absolute' }}
        destroyOnClose={true}
        extra={selectionControls}
      >
        <MapDrawerNoSSR
          center={mapCenter}
          readonly={readonly}
          updatePosition={({ lat, lng }) => onChange({ lat, lg: lng, type })}
        />
      </Drawer>
    </>
  );
}

export default GeoLocation;
