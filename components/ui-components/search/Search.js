import { useState } from 'react'
import { inputsMapping } from '../Inputs/config'
import { defaultGeolocationProps } from '../Inputs/mappers'
import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const SearchQuery = ({ setSearchData, refetch }) => {
    const [value, setValue] = useState(defaultGeolocationProps)
    const InputGeolocation = inputsMapping.latilong

    const onChangeMap = (e) => {
        setValue(e)
        setSearchData(prev => ({
            ...prev,
            latitude: e.lat,
            longitude: e.lg,
        }))
    }

    return (
        <>
            <div style={{ width: 350, display: 'flex', alightItems: 'center', marginBottom: 10 }}>
                <div style={{ marginRight: 30 }}>
                    <InputGeolocation value={value} onChange={onChangeMap} />
                </div>
                <Button style={{ display: 'inline', marginRight: 10 }} onClick={refetch} type="secondary" icon={<SearchOutlined />} size="large">
                    Search
                </Button>
            </div>
        </>
    )
}

export default SearchQuery

