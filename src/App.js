import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/home';
import Menu from './pages/menu';
import NotFound from './pages/NotFound';
import AccountPage from './pages/accounts';
import InventoryPage from './pages/inventory';

function App() {
  const [mode, setMode] = useState(sessionStorage.getItem('mode') ? sessionStorage.getItem('mode') : 'light');
  useEffect(() => {
    var xApp = document.getElementById('appBody');
    xApp.classList.add('modeFade');
  }, [mode]);

  return (
    <div className={ `bg-${mode}` } style={ { height: window.innerHeight } }>
      <BrowserRouter>
        <div className={ `d-flex flex-fill flex-column align-items-center bg-${mode}` }>
          {/* HEADER 12% HEIGHT */ }
          <Header mode={ mode } setMode={ setMode } />

          {/* BODY 88% HEIGHT */ }
          <div id="appBody" className={ `d-flex bg-${mode}` } style={ { height: window.innerHeight * .88, marginTop: window.innerHeight * .12, width: window.innerWidth } }>
            <Switch>
              <Route path="/" exact>
                <Home mode={ mode } />
              </Route>
              <Route path="/accounts">
                <AccountPage />
              </Route>
              <Route path="/inventory">
                <InventoryPage />
              </Route>
              <Route path="/menu">
                <Menu />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
