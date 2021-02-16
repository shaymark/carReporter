//home.js

// all data table is taken from https://material-ui.com/components/tables/

// Material UI components
import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import { authMiddleWare } from '../util/auth';

import MessageComponent from '../components/messges/messagesComponent'
import AddMessagesComponent from '../components/addMessage/addMessage'


const styles = (theme) => ({
    linkList: {
        backgoundColor: 'red',
        color: 'green'
    }
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
                <div className={classes.linkList}>
                    <ul>
                        <li><a href="./messages">messages</a></li>
                        <li><a href="./generateBarcode">genarate barcode</a></li>
                    </ul>
                </div>
                
            </div>
        )
    }
}

export default withStyles(styles)(messages)