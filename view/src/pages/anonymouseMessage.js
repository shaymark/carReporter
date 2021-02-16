//home.js

// all data table is taken from https://material-ui.com/components/tables/

// Material UI components
import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import { authMiddleWare } from '../util/auth';

import AddMessagesComponent from '../components//addMessage/addMessage';
import ThankYouComponent from '../components/ThankYou';
import UserDetails from '../components/userDetails'

import queryString from 'query-string'

const styles = (theme) => ({
   
})

class messages extends Component {

    constructor(porps) {
        super(porps);
        
        let params = queryString.parse(this.props.location.search)
        console.log(params);
        console.log("hellooooooo");

        this.state = {
            address: params.toAddress ?? undefined, //0Afj3p1rD5P1P4o0QhO2 
            thankYou: false
        }

        this.handleSubmit = this.handleSubmit
    }

    
    onMessageAdded = () => {
        console.log("onMessageAdded", Date.now());
        this.setState( {
            messagesUpdateTime:  Date.now(),
            thankYou: true
        })
    }

    render() {

        const { classes } = this.props;
        const { errors } = this.state;

        return (
            <div>
                <UserDetails {...this.props}/>
                {this.state.thankYou  ? 
                    <ThankYouComponent/>
                :
                <div>
                    add message:
                    <AddMessagesComponent
                        onMessageAdded={this.onMessageAdded}
                        address={this.state.address}
                        {...this.props}
                    />
               </div>
                }
            </div>
            
        )
    }
}

export default withStyles(styles)(messages)