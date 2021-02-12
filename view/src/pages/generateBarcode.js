//home.js

// all data table is taken from https://material-ui.com/components/tables/

// Material UI components
import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import Barcode from '../components/qrCode'
import AddressSelector from '../components/addressComponent'
import queryString from 'query-string'
import { BaseUrl } from '../util/config'


const styles = (theme) => ({
   
})

class generateBarcode extends Component {

    constructor(porps) {
        super(porps);


        this.state = {
            address: "" 
        }

        let params = queryString.parse(this.props.location.search)
        let toAddress = params.toAddress;
        this.address = this.postMessageUrl(toAddress) ?? undefined

        this.onAddressChange = this.onAddressChange.bind(this);

    }

    onAddressChange(item) {
        if(item.address){
            this.setState({
                address: this.postMessageUrl(item.address)
            })
        }
    }

    postMessageUrl = (address) => {
        return `${BaseUrl}/anonymouseMessages?toAddress=${address}`
      }

    render() {

        const { classes } = this.props
        console.log(this.state.address)
        return (
            <div className={classes.printLayout}>
                <AddressSelector onChange={this.onAddressChange}/>
                <Barcode address={this.state.address}/>
            </div>
        )
    }
}

export default withStyles(styles)(generateBarcode)