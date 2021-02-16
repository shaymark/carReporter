import React, { useState, useEffect } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import styles from './styles'

import { getAllAddress } from '../../util/serverApi'

const AddressPicker = ({classes, onChange})  => {
    
    const [address, setAddress] = useState('')
    const [addressArray, setAddrssArray] = useState([])

    const setAddressItem = (address) => {
        setAddress(address)
        onChange && onChange({address: address}) 
    }

    useEffect(()=>{
        getAllAddress()
        .then((response) => {
            let items = response.data.map((item) => {
                return {
                    name: item.addressName,
                    value: item.addressId
                }
            })

            setAddrssArray(items)
            setAddressItem(items[0].value)
        })
        .catch((err) => {
            console.log(err);
        }); 
    },[])
    
    return (
        <div>
            <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="address-native-simple">Address</InputLabel>
                    <Select
                    native
                    value={address}
                    onChange={(event)=> setAddressItem(event.target.value)}
                    inputProps={{
                        name: 'address',
                        id: 'address-native-simple',
                    }}
                    >
                    {addressArray.map((item, index) => {
                        return <option key={index} value={item.value}>{item.name}</option> 
                    })}
                </Select>
            </FormControl>
        </div>
    )
}

export default withStyles(styles)(AddressPicker)