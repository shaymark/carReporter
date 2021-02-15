//home.js

// all data table is taken from https://material-ui.com/components/tables/

// Material UI components
import React, { Component } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import { authMiddleWare } from '../util/auth';

import { getUserDetails } from '../util/serverApi'

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

class userDetail extends Component {

    createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
     }

    constructor(porps) {
        super(porps);

        this.state = {
            data: {rows: [], columns: []},
            addressFilter: '',
            errors: [],
            loading: false,
            isAnonimouse: false
        }
    }

    // need to add delete selected messages

    componentWillMount = () => {
        console.log(this.props);
        if(!localStorage.getItem('AuthToken')) {
            this.setState({
                user: {
                    username: "anonymouseUser@anonymoseUser.com"
                },
                isAnonimouse: true
            });
        } else {
            this.updateUserDetail();
        }
        
    };
    
    componentDidUpdate(prevProps) {
        console.log("component updated");
        console.log(this.props.messagesUpdateTime);
        if(!equal(this.props.messagesUpdateTime, prevProps.messagesUpdateTime)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
        {
          this.updateUserDetail();
        }
      } 

      updateUserDetail() {
        console.log("updateUserDetail")
        getUserDetails()
        .then((response) => {
            console.log(response)
            this.setState({
                username: response.data.username,
            });
        })
        .catch((err) => {
            console.log(err);
            if (err.response.status === 403) {
                console.log(this.props.history)
                if(this.props.history) {
                this.props.history.push('/login');
                }
            }
            console.log(err);
        }); 
    }

    render() {
        return (
            <div>
                {this.state.isAnonimouse ?
                <div>
                    current user: anonymouse
                </div> 
                :
                <div>
                    current user: userName: {this.state.username}
                </div>
                }
          </div>
        )
    }
}

export default withStyles(styles)(userDetail)