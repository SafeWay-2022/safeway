import { useState } from 'react';
import { inputsMapping } from '../Inputs/config';
import { SearchOutlined } from '@ant-design/icons';
import { Button, InputNumber, Select, Radio, message } from 'antd';
import SelectCategory from '../Inputs/SelectCategory';
import SelectMultiple from '../Inputs/SelectMultiple';

const initTextState = {
  city: null,
  organizations: null,
  categories: null,
  author: null,
  admin: null,
  name: null,
};
const initCheckBox = {
  add_distance: true,
};

const SearchQuery = ({
  setSearchData,
  refetch,
  page,
  setPage,
  setMapView,
  mapView,
  value,
  setValue,
  component,
}) => {
  const [country, setCountry] = useState(undefined);
  const [categories, setCategories] = useState('');
  const [text, setText] = useState(initTextState);
  const [checkBox, setCheckbox] = useState(initCheckBox);
  const [max_distance, setDistance] = useState(null);
  const [approved, setApproved] = useState(null);
  const [active, setActive] = useState(null);
  const [name, setName] = useState(null);
  const InputGeolocation = inputsMapping.geo;
  const SelectCountry = inputsMapping.country;
  const Input = inputsMapping.string;

  const onChangeText = (e) => {
    setText((prev) => ({ ...prev, [e.target.name]: e.target.value ? e.target.value : null }));
  };

  // const onChangeCheckBox = () => {
  //   setCheckbox({ add_distance: !checkBox.add_distance });
  // };
  const onChangeSelectApproved = (e) => {
    if (e === '-') {
      setApproved(null);
      return;
    }
    setApproved(e);
  };
  const onChangeSelectActive = (e) => {
    if (e === '-') {
      setActive(null);
      return;
    }
    setActive(e);
  };
  const onChangeName = (e) => {
    if (e.target.value) {
      setName(e.target.value);
    } else {
      setName(null);
    }
  };

  const onSearch = () => {
    // if (!value.lat || !value.lg) {
    //   message.error('Coordinates is required');
    //   return;
    // }
    new Promise((resolve) => {
      resolve();
    })
      .then(() =>
        setSearchData({
          approved,
          active,
          country,
          max_distance,
          ...text,
          ...checkBox,
          categories,
          latitude: value.lat,
          longitude: value.lg,
          name,
        }),
      )
      .then(() => refetch())
      .catch((e) => console.log(e));
  };

  const onClear = () => {
    setCountry(undefined);
    setValue({});
    setSearchData({});
    setDistance(null);
    setText(initTextState);
    setCheckbox(initCheckBox);
    setPage(0);
    setActive(null);
    setApproved(null);
    setName(null);
    setCategories('');
  };

  return (
    <div style={{ marginBottom: 5 }}>
      <div style={{ display: 'flex', alightItems: 'center', marginBottom: 5 }}>
        <div style={{ marginRight: 10 }}>
          <InputGeolocation value={value} onChange={setValue} />
        </div>
        <div style={{ marginRight: 10 }}>
          <SelectCountry value={country} onChange={setCountry} />
        </div>
        <div style={{ marginRight: 10 }}>
          <Input
            value={text.name}
            onChange={onChangeText}
            name="name"
            placeholder="name"
            style={{ width: '100px' }}
          />
        </div>
        <div style={{ marginRight: 10 }}>
          <InputNumber
            value={max_distance}
            parser={(x) => Number(x).toFixed(3)}
            onChange={setDistance}
            name="max_distance"
            placeholder="Max distance"
            type="number"
            style={{ width: '120px' }}
          />
        </div>
        <div style={{ marginRight: 10 }}>
          <Input
            value={name}
            onChange={onChangeName}
            name="name"
            placeholder="Name"
            style={{ width: '100px' }}
          />
        </div>
        <div style={{ marginRight: 10 }}>
          <Input
            value={text.city}
            onChange={onChangeText}
            name="city"
            placeholder="City"
            style={{ width: '100px' }}
          />
        </div>
        <div style={{ marginRight: 10 }}>
          <SelectCategory
            value={categories ? categories : 'Select category'}
            style={{ width: 150, ...(categories ? {} : { color: 'grey' }) }}
            onChange={(e) => {
              setCategories(e);
            }}
          />
        </div>
        <div style={{ marginRight: 10 }}>
          <Input
            value={text.organizations}
            onChange={onChangeText}
            name="organizations"
            placeholder="Organizations"
            style={{ width: '120px' }}
          />
        </div>
        <div style={{ marginRight: 10 }}>
          <Input
            value={text.author}
            onChange={onChangeText}
            name="author"
            placeholder="Author"
            style={{ width: '100px' }}
          />
        </div>
        <div style={{ marginRight: 100 }}>
          <Input
            value={text.admin}
            onChange={onChangeText}
            name="admin"
            placeholder="Admin"
            style={{ width: '100px' }}
          />
        </div>
        <div>
          <Button
            style={{
              backgroundColor: '#4742DD',
            }}
            onClick={onSearch}
            type="secondary"
            icon={<SearchOutlined />}
            size="large"
          >
            Search
          </Button>
          <Button style={{ display: 'inline' }} onClick={onClear} type="secondary" size="large">
            Clear
          </Button>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: 20 }}>{component}</div>
        <div style={{ marginRight: '550px' }}>
          <Radio.Button
            style={!mapView ? { backgroundColor: '#4742DD', color: 'white' } : {}}
            onClick={() => setMapView(false)}
            value="Table"
          >
            Table
          </Radio.Button>
          <Radio.Button
            style={mapView ? { backgroundColor: '#4742DD', color: 'white' } : {}}
            onClick={() => setMapView(true)}
            value="Map"
          >
            Map
          </Radio.Button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 10 }}>
          <span style={{ marginRight: '5px' }}>Approved</span>
          <Select
            defaultValue="-"
            style={{
              width: 80,
            }}
            onChange={onChangeSelectApproved}
          >
            <Select.Option value="-">{null}</Select.Option>
            <Select.Option value="true">true</Select.Option>
            <Select.Option value="false">false</Select.Option>
          </Select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 600 }}>
          <div style={{ marginRight: '5px' }}>Active</div>
          <Select
            defaultValue="-"
            style={{
              width: 80,
            }}
            onChange={onChangeSelectActive}
          >
            <Select.Option value="-">{null}</Select.Option>
            <Select.Option value="true">true</Select.Option>
            <Select.Option value="false">false</Select.Option>
          </Select>
        </div>
        {/* <div style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}>
          <span style={{ cursor: 'pointer' }} onClick={onChangeCheckBox} name="add_distance">
            <ImageComponent
              src={checkBox.add_distance ? '/checked.svg' : '/not_checked.svg'}
              alt="checkbox"
              width="25px"
              height="25px"
            />
          </span>
          <span style={{ marginLeft: '5px' }}>Add distance</span>
        </div> */}
      </div>
    </div>
  );
};

export default SearchQuery;
