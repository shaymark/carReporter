//home.js

// all data table is taken from https://material-ui.com/components/tables/

// Material UI components
import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import { authMiddleWare } from '../util/auth';

import MessageComponent from '../components/messges/messagesComponent'
import AddMessagesComponent from '../components/addMessage/addMessage'

const styles = (theme) => ({
    papare: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {

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

        this.handleSubmit = this.handleSubmit
    }


    componentWillMount = () => {
        console.log(this.props.history);
		authMiddleWare(this.props.history);
    };

    
    onMessageAdded = () => {
        console.log("onMessageAdded", Date.now());
        this.setState( {
            messagesUpdateTime:  Date.now()
        })
    }

    render() {

        const { classes } = this.props;
        const { errors } = this.state;

        return (
            <div>
                messages table
                <MessageComponent messagesUpdateTime={this.state.messagesUpdateTime} {...this.props}/>
                add message
               <AddMessagesComponent
                    onMessageAdded={this.onMessageAdded}
               />
            </div>
            
        )
    }
}

export default withStyles(styles)(messages)