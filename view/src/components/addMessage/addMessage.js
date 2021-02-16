import React, { useState } from 'react';

import styles from './styles'

import withStyles from '@material-ui/core/styles/withStyles';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

import { postMessage } from '../../util/serverApi'


const AddMessages = (props) => {
    const {classes, onMessageAdded} = props
    const toAddressProps = props.address

    const [title, setTitle] = useState('') 
    const [body, setBody] = useState('')
    const [toAddress, setToAddress] = useState(toAddressProps)
    const [errors, setErros] = useState({})
    const [open, setOpen] = useState(true)

    const handleSubmit = (event) => {
        event.preventDefault();
        
        postMessage({
            title: title,
            body: body,
            toAddress: toAddress
        })
        .then(() => {
            setTitle('')
            setBody('')
            setToAddress('')
            setErros({})
            setOpen(false)
        
            onMessageAdded()
        })
        .catch((error) => {
            setOpen(true)
            setErros(error && error.response && error.response.data || {})
            console.log(error)
        });
    }
      

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
                                        value={title}
                                        error={errors.title ? true : false}
                                         onChange={(event)=>{setTitle(event.target.value)}}
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
                                        value={body}
                                        error={errors.body ? true: false}
                                        onChange={(event)=>{setBody(event.target.value)}}
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
                                        value={props.address || toAddress}
                                        disabled={props.address}
                                        error={errors.toAddress ? true: false}
                                        onChange={(event)=>{setToAddress(event.target.value)}}
                                        />
                                </Grid>
                                <Button
                                    fullWidth
                                    varient="contained"
                                    autofocus
                                    color="inherit"
                                    onClick={handleSubmit}
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

export default withStyles(styles)(AddMessages)