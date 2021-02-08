//home.js

// all data table is taken from https://material-ui.com/components/tables/

// Material UI components
import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import { DataGrid } from '@material-ui/data-grid';

import { authMiddleWare } from '../util/auth';

import axios from 'axios';

import equal from 'fast-deep-equal'

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

class thankYou extends Component {

    render() {
        return (
            <div>
                Thank you !
            </div>
                
        )
    }
}

export default withStyles(styles)(thankYou)