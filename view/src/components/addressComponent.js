import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import { authMiddleWare } from '../util/auth';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

import { getAllAddress } from '../util/serverApi'


const styles = (theme) => ({
    
})

class address extends Component {

    handleChange = (event) => {
        const name = event.target.name;
        this.setState({
          ...this.state,
          [name]: event.target.value,
        });
        if(name === 'address') {
            this.props.onChange && this.props.onChange({
                address: event.target.value
            })
        }
      };

    constructor(porps) {
        super(porps);

        this.state = {
            address: '',
            addressArray: []
          }

          this.getAddressFromServer()
    }

    getAddressFromServer(){
        getAllAddress()
        .then((response) => {
            console.log(response.data)
            let items = response.data.map((item) => {
                return {
                    name: item.addressName,
                    value: item.addressId
                }
            })
            this.setState({
                addressArray: items,
                address: items[0].value
            })
            this.props.onChange({
                address: items[0].value
            })
        })
        .catch((err) => {
            console.log(err);
        }); 
    }

    render() {

        const { classes } = this.props

        return (
            <div>
               <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="address-native-simple">Address</InputLabel>
                    <Select
                        native
                        value={this.state.address}
                        onChange={this.handleChange}
                        inputProps={{
                            name: 'address',
                            id: 'address-native-simple',
                        }}
                    >
                        {this.state.addressArray.map((item) => {
                           return <option value={item.value}>{item.name}</option> 
                        })}
                    </Select>
                </FormControl>
            </div>
        )
    }

}

export default withStyles(styles)(address)