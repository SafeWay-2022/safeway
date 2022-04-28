import { Select } from 'antd';

const { Option } = Select;

export default ({ options = [], value, placeholder, onChange = () => {} }) => (
  <Select
    mode="tags"
    value={value || undefined}
    style={{ width: '100%' }}
    placeholder={placeholder}
    onChange={onChange}
  >
    {options.map((row) => {
      // TODO - take it to the mapper
      return (
        <Option key={row._id} value={row._id}>
          {row.ua || row.ru || row.en || row._id}
        </Option>
      );
    })}
  </Select>
);
