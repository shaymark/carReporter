

import React, { Component } from 'react';



import withStyles from '@material-ui/core/styles/withStyles';

import ReactToPrint from "react-to-print"
import QRCode from "qrcode.react"
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
  barcodeArea:{
    maxWidth:"400px",
    textAlign: "center"
  }
})

class qrCode extends Component {

  constructor(porps) {
    super(porps);

    this.state = {
      
    }
    this.componentRef = {}
    const { address } = porps
    this.messageUrl = address
}

    handleChange = (event) => {
      console.log("handleChange");
      this.setState({
          [event.target.name]: event.target.value
      })
    }

    render(){
      const { classes } = this.props
      return(
        <div>

                <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="barcodeTitle"
                            label="barcodTitle"
                            name="barcodeTitle"
                            onChange={this.handleChange}
                        />
          <ReactToPrint
             trigger={() => <a href="#">Print this out!</a>}
             content={() => this.componentRef}
          />
          <div className={classes.barcodeArea} ref={(el) => (this.componentRef = el)}>
            <p>{this.state.barcodeTitle}</p>
            <QRCode value={this.messageUrl} />
            <p>{this.messageUrl}</p>
          </div>
        </div>
      )
    }
}

export default withStyles(styles)(qrCode)
