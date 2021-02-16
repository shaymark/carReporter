//home.js

// all data table is taken from https://material-ui.com/components/tables/

// Material UI components
import React, { useState, useEffect } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import { DataGrid } from '@material-ui/data-grid';

import {getAllMessages} from '../../util/serverApi';

import styles from './styles';


const Message = (props) => {
    const {messagesUpdateTime} = props
    const [data, setData] = useState({rows: [], columns: []})
    
    useEffect(()=>{
        getAllMessages()
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
                
                setData(data)
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    if(props.history) {
                        props.history.push('/login');
                    }
                }
                console.log(err);
            });  
    }, messagesUpdateTime)

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid  {...data} pageSize={5} checkboxSelection />
        </div>
    )
}

export default withStyles(styles)(Message)