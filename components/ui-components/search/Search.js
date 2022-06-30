import { useState } from 'react'
import { inputsMapping } from '../Inputs/config'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Checkbox, InputNumber, Select } from 'antd';

const initTextState = {
    city: null,
    organizations: null,
    categories: null,
    author: null,
    admin: null
}
const initCheckBox = {
    add_distance: null
}

const SearchQuery = ({ setSearchData, refetch, page, setPage, setPage, setMapView, mapView, value, setValue }) => {
    const [value, setValue] = useState({})
    const [country, setCountry] = useState(undefined)
    const [text, setText] = useState(initTextState)
    const [checkBox, setCheckbox] = useState(initCheckBox)
    const [max_distance, setDistance] = useState(null)
    const [approved, setApproved] = useState(null)
    const [active, setActive] = useState(null)
    const InputGeolocation = inputsMapping.geo
    const SelectCountry = inputsMapping.country
    const Input = inputsMapping.string

    const onChangeText = (e) => {
        setText(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const onChangeCheckBox = (e) => {
        setCheckbox(prev => ({ ...prev, [e.target.name]: !prev[e.target.name] }))
    }
    const onChangeSelectApproved = (e) => {
        if (e === '-') {
            setApproved(null)
            return
        }
        setApproved(e)
    }
    const onChangeSelectActive = (e) => {
        if (e === '-') {
            setActive(null)
            return
        }
        setActive(e)
    }

    const onSearch = () => {
        new Promise((resolve) => {
            resolve()
        })
            .then(() => setSearchData({
                approved, active, country, max_distance, ...text, ...checkBox, latitude: value.lat,
                longitude: value.lg
            }))
            .then(() => refetch())
            .catch(e => console.log(e))
    }

    const onClear = () => {
        setCountry(undefined)
        setValue({})
        setSearchData({})
        setDistance(null)
        setText(initTextState)
        setCheckbox(initCheckBox)
        setPage(0)
        setActive(null)
        setApproved(null)
    }

    return (
        <>
            <div style={{ display: 'flex', alightItems: 'center', marginBottom: 10 }}>
                <div style={{ marginRight: 10 }}>
                    <InputGeolocation value={value} onChange={setValue} />
                </div>
                <div style={{ marginRight: 10 }}>
                    <SelectCountry value={country} onChange={setCountry} />
                </div>
                <div style={{ marginRight: 10 }}>
                    <InputNumber
                        value={max_distance}
                        parser={x => Number(x).toFixed(3)}
                        onChange={setDistance}
                        name='max_distance'
                        placeholder="Max distance"
                        type="number"
                        style={{ width: '120px' }}
                    />
                </div>
                <div style={{ marginRight: 10 }}>
                    <Input value={text.city} onChange={onChangeText} name='city' placeholder="City" style={{ width: '100px' }} />
                </div>
                <div style={{ marginRight: 10 }}>
                    <Input value={text.categories} onChange={onChangeText} name='categories' placeholder="Categories" style={{ width: '120px' }} />
                </div>
                <div style={{ marginRight: 10 }}>
                    <Input value={text.organizations} onChange={onChangeText} name='organizations' placeholder="Organizations" style={{ width: '120px' }} />
                </div>
                <div style={{ marginRight: 10 }}>
                    <Input value={text.author} onChange={onChangeText} name='author' placeholder="Author" style={{ width: '100px' }} />
                </div>
                <div style={{ marginRight: 10 }}>
                    <Input value={text.admin} onChange={onChangeText} name='admin' placeholder="Admin" style={{ width: '100px' }} />
                </div>

            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}>
                    <div style={{ marginRight: '5px' }}>Approved</div>
                    <Select
                        defaultValue="-"
                        style={{
                            width: 80,
                        }}
                        onChange={onChangeSelectApproved}
                    >
                        <Option value="-">{null}</Option>
                        <Option value="true">true</Option>
                        <Option value="false">false</Option>
                    </Select>

                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: 20 }}>
                    <div style={{ marginRight: '5px' }}>Active</div>
                    <Select
                        defaultValue="-"
                        style={{
                            width: 80,
                        }}
                        onChange={onChangeSelectActive}
                    >
                        <Option value="-">{null}</Option>
                        <Option value="true">true</Option>
                        <Option value="false">false</Option>
                    </Select>

                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: 20 }} >

                    <Checkbox checked={checkBox.add_distance} onChange={onChangeCheckBox} name='add_distance' />
                    <span style={{ marginLeft: '5px' }}>Add distance</span>
                </div>
            </div>
            <div style={{ textAlign: 'end', marginBottom: 5 }}>
                <Button style={{ display: 'inline', marginRight: 10 }} onClick={onSearch} type="secondary" icon={<SearchOutlined />} size="default">
                    Search
                </Button>
                <Button style={{ display: 'inline' }} onClick={onClear} type="secondary" size="default">
                    Clear
                </Button>
            </div>
            {page > 1 && <Button style={{ display: 'inline', marginRight: 5 }} onClick={() => setPage(page - 10)} type="secondary" size="default">
                Previous page
            </Button>}
            <Button style={{ display: 'inline' }} onClick={() => setPage(page + 10)} type="secondary" size="default">
                Next page
            </Button>

        </>
    )
}

export default SearchQuery

