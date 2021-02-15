import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import { authMiddleWare } from '../util/auth';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

import {postAnonymosMessage}  from '../util/serverApi'

import MessageComponent from './messagesComponent'
import { NoRowsOverlay } from '@material-ui/data-grid';

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

class addMessages extends Component {

    constructor(porps) {
        super(porps);

        this.state = {
            data: {rows: [], columns: []},
            toAddress: porps.address ?? '',
            addressEdit: this.props.address ? true : false,
            errors: [],
            loading: false
        }

        this.handleSubmit = this.handleSubmit
    }

    handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};
    
    handleSubmit = (event) => {
        event.preventDefault();

        postAnonymosMessage({
            title: this.state.title,
            body: this.state.body,
            toAddress: this.state.toAddress
        })
        .then(() => {
            this.setState({ 
                open: false 
            });
            this.props.onMessageAdded()
            console.log(this.props);
        })
        .catch((error) => {
            this.setState({ open: true, errors: error.response.data });
            console.log(error);
        });
    }

    render() {

        const { classes } = this.props;
        const { errors } = this.state;

        return (
            <div>
                <div>
                <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										id="messageTitle"
										label="Message Title"
										name="title"
										autoComplete="messageTitle"
										helperText={errors.title}
										value={this.state.title}
										error={errors.title ? true : false}
										onChange={this.handleChange}
									/>
								</Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="messageDetails"
                                        label="Message Details"
                                        name="body"
                                        autoComplete="messageDetails"
                                        multiline
                                        rows={2}
                                        rowsMax={2}
                                        helperText={errors.body}
                                        value={this.state.body}
                                        error={errors.body ? true: false}
                                        onChange={this.handleChange}
                                        />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="toAddress"
                                        label="To Address"
                                        name="toAddress"
                                        autoComplete="toAddress"
                                        rows={1}
                                        helperText={errors.toAddress}
                                        disabled={this.state.addressEdit}
                                        value={this.state.toAddress}
                                        error={errors.toAddress ? true: false}
                                        onChange={this.handleChange}
                                        />
                                </Grid>
                                <Button
                                    autofocus
                                    color="inherit"
                                    onClick={this.handleSubmit}
                                    className={classes.submitButton}
                                    >
                                        Submit
                                    </Button>
                            </Grid>
                        </form>
                </div>
            </div>
            
        )
    }
}

export default withStyles(styles)(addMessages)