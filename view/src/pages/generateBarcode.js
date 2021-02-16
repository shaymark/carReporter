

import React, { useEffect, useState, useRef } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';

import ReactToPrint from "react-to-print"
import QRCode  from "qrcode.react"
import TextField from '@material-ui/core/TextField';

import AddressPicker from '../components/address/addressComponent'

import {BaseUrl} from '../util/config'
import userDetails from '../components/userDetails';

const styles = (theme) => ({
  barcodeArea:{
    maxWidth:"400px",
    textAlign: "center",
    borderStyle: "solid"
  }
  
})

const postMessageUrl = (address) => {
  return `${BaseUrl}/anonymouseMessages?toAddress=${address}`
}

const CustomQRCode = () => {

  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [data, setData] = useState({title:'', address:''})

  useEffect(()=>{
    setData({title, address})
  }, [title, address])

  const pageEl = useRef(null)

  return (
    <div>
      <userDetails/>
      <AddressPicker onChange={(item)=>setAddress(postMessageUrl(item.address))}/>
      <ReactToPrint
             trigger={() => <a href="#">Print this out!</a>}
             content={() => pageEl.current}
          />
     <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="barcodeTitle"
            label="barcodTitle"
            name="barcodeTitle"
            onChange={(event)=>{setTitle(event.target.value)}}
                        /> 
      <div ref={pageEl}>
        <Page  data={data}/>
      </div>
    </div>
  )
}

const Page = withStyles(styles)
  ((props) => {
    const { classes, data} = props
    return(     
      <div className={classes.barcodeArea}>
        <p>{props.data.title}</p>
        <QRCode value={props.data.address} />
        <p>{props.data.address}</p>
      </div>
    )
})

export default withStyles(styles)(CustomQRCode)
