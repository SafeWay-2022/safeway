import { inputsMapping } from '../Inputs/config'
import { SearchOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';


const SearchQuery = ({ setSearchData, refetch, setPage, value, setValue, component }) => {

    const InputGeolocation = inputsMapping.geo



    const onSearch = () => {
        if (!value.lat || !value.lg) {
            message.error('Coordinates is required');
            return
        }
        new Promise((resolve) => {
            resolve()
        })
            .then(() => setSearchData({
                latitude: value.lat,
                longitude: value.lg
            }))
            .then(() => refetch())
            .catch(e => console.log(e))
    }

    const onClear = () => {
        setValue({})
        setSearchData({})
        setPage(0)

    }

    return (
        <>
            <div style={{ display: 'flex', alightItems: 'center', marginBottom: 10 }}>
                <div style={{ marginRight: 10 }}>
                    <InputGeolocation value={value} onChange={setValue} />
                </div>
                <div style={{ textAlign: 'end', marginBottom: 5 }}>
                    <Button style={{ display: 'inline', marginRight: 10 }} onClick={onSearch} type="secondary" icon={<SearchOutlined />} size="default">
                        Search
                    </Button>
                    <Button style={{ display: 'inline' }} onClick={onClear} type="secondary" size="default">
                        Clear
                    </Button>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    {component}
                </div>
            </div>
        </>
    )
}

export default SearchQuery

