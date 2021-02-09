//home.js

// all data table is taken from https://material-ui.com/components/tables/

// Material UI components
import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import Barcode from '../components/qrCode'
import queryString from 'query-string'
import { BaseUrl } from '../util/config'

const styles = (theme) => ({
    
})

class generateBarcode extends Component {

    constructor(porps) {
        super(porps);

        let params = queryString.parse(this.props.location.search)
        let toAddress = params.toAddress;
        this.address = this.postMessageUrl(toAddress) ?? undefined

    }

    postMessageUrl = (address) => {
        return `${BaseUrl}/anonymouseMessages?toAddress=${address}`
      }

    render() {
        return (
            <div>
                <Barcode address={this.address}/>
            </div>
        )
    }
}

export default withStyles(styles)(generateBarcode)