// login.js

// Material UI components
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseLine from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';

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


class login extends Component {

    constructor(porps) {
        super(porps);

        this.state = {
            email: '',
            password: '',
            errors: [],
            loading: false
        }
    }

    //need to use the new functions!!!
    // static getDerivedStateFromProps(nextProps, prevSate) {
    //     if(nextProps.someValue!=prevSate.someValue) {
    //         return { someSate: nextProps.someValue};
    //     }
    //     else return null;
    // }

   componentWillReceiveProps(nextProps) {
       if (nextProps.UI.errors) {
           this.setState({
               errors: nextProps.UI.errors
           })
       }
   }

   handleChange = (event) => {
       console.log("handleChange");
       this.setState({
           [event.target.name]: event.target.value
       })
   }

   handleSubmit = (event) => {
       event.preventDefault();
       this.setState({loading: true})
       const userData = {
           email: this.state.email,
           password: this.state.password
       };
       axios
        .post('/login', userData)
        .then((response)=> {
            localStorage.setItem('AuthToken', `Bearer ${response.data.token}`);
            this.setState({
                loading: false,
            });
            this.props.history.push('/');
        })
        .catch((error)=>{
            this.setState({
                errors: error.response.data,
                loading: false
            });
        });
   }

    render() {
        const { classes } = this.props
        const {errors, loading } = this.state
        return (
           <Container component="main" maxWidth="xs">
               <CssBaseLine />
               <div className={classes.papare}>
                   <Avatar className={classes.avatar}>
                       <LockOutlinedIcon/>
                   </Avatar>
                   <Typography component="h5" varient="h5">
                       Login
                   </Typography>
                   <form className={classes.form} noValidate>
                       <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            onChange={this.handleChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            name="password"
                            autoComplete="current-password"
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            onChange={this.handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            varient="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.handleSubmit}
                            disabled={(loading || !this.state.email || !this.state.password)}
                            
                        >
                            Sign In
                            {loading && <CircularProgress size={30} className={classes.progress} />}
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="signup" variant="body2">
                                    {"Dont have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}

                   </form>

               </div>
           </Container>
        )
    }
}

export default withStyles(styles)(login)