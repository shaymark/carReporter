import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import login from './pages/login' 
import signup from './pages/signup' 
import home from './pages/home' 
import messages from './pages/messages';
import demoTable from './pages/demoTable';
import anonymouseMessages from './pages/anonymouseMessage';
import { ThemeProvider as MuliThemeProvider } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import generateBarcode from './pages/generateBarcode';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#FF5722',
      dark: '#d50000',
      contrastText: '#fff'
    }
  }
})

function App()  {
  return (
    <MuliThemeProvider theme={theme}>
      <div>
          <Router>
            <div>
              <Switch>
                  <Route exact path="/login" component={login}/>
                  <Route exact path="/messages" component={messages}/>
                  <Route exact path="/anonymouseMessages" component={anonymouseMessages}/>
                  <Route exact path="/generateBarcode" component={generateBarcode}/>
                  <Route exact path="/demotable" component={demoTable}/>
                  <Route exact path="/" component={home}/> 
                  {/*<Route exact path="/signup" component={signup}/>
                  <Route exact path="/" component={home}/> */}
              </Switch>
            </div>
          </Router>
      </div>
    </MuliThemeProvider>
  )
}

export default App;