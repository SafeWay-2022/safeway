import { AimOutlined } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd';
import React from 'react';

function GeoLocation({ lat = '0.0002', lg = '42.0002', type = 'Point', readonly }) {
  return (
    <Input.Group>
      <Input readonly style={{ width: 'calc(50% - 17px)' }} defaultValue={lat} />
      <Input readonly style={{ width: 'calc(50% - 17px)' }} defaultValue={lg} />
      <Tooltip title="select on the map">
        <Button icon={<AimOutlined />} />
      </Tooltip>
    </Input.Group>
  );
}

export default GeoLocation;
