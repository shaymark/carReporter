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

class messages extends Component {

    createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
     }

    constructor(porps) {
        super(porps);

        this.state = {
            data: {rows: [], columns: []},
            addressFilter: '',
            errors: [],
            loading: false
        }
    }

    // need to add delete selected messages

    componentWillMount = () => {
		this.updateMessages();
    };
    
    componentDidUpdate(prevProps) {
        console.log("component updated");
        console.log(this.props.messagesUpdateTime);
        if(!equal(this.props.messagesUpdateTime, prevProps.messagesUpdateTime)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
        {
          this.updateMessages();
        }
      } 

    updateMessages() {
        authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/message')
			.then((response) => {
                
                const data = {};
                data.columns = [
                        { field: 'id', headerName: 'ID', width: 250 },
                        { field: 'title', headerName: 'Title', width: 130 },
                        { field: 'body', headerName: 'Body', width: 130 },
                      ]
                data.rows = response.data.map((item) => {
                    return(
                        {
                        id: item.messageId,
                        title: item.title,
                        body: item.body
                        }
                    )}
                    );
        
				this.setState({
                    data: data,
					messages: response.data,
					uiLoading: false
				});
			})
			.catch((err) => {
                if (err.response.status === 403) {
                   if(this.props.history) {
                    this.props.history.push('/login');
                   }
                }
				console.log(err);
			}); 
    }

    render() {
        return (
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid  {...this.state.data} pageSize={5} checkboxSelection />
          </div>
        )
    }
}

export default withStyles(styles)(messages)