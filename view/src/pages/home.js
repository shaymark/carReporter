//home.js

// all data table is taken from https://material-ui.com/components/tables/

// Material UI components
import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import { authMiddleWare } from '../util/auth';

import MessageComponent from '../components/messagesComponent'
import AddMessagesComponent from '../components/addMessage'
import Barcode from '../components/qrCode'

const styles = (theme) => ({
    
})

class messages extends Component {

    constructor(porps) {
        super(porps);

        this.state = {
            data: {rows: [], columns: []},
            addressFilter: '',
            errors: [],
            loading: false
        }

    }


    componentWillMount = () => {
        
    };


    render() {

        const { classes } = this.props;
        const { errors } = this.state;

        return (
            <div>
                <a href="./messages">messages</a>
            </div>
        )
    }
}

export default withStyles(styles)(messages)