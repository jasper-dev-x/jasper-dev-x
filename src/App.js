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
  const [mode, setMode] = useState({
    bg: sessionStorage.getItem('modeBg') ? sessionStorage.getItem('modeBg') : 'light',
    txt: sessionStorage.getItem('modeTxt') ? sessionStorage.getItem('modeTxt') : 'dark',
  });
  useEffect(() => {
    var xApp = document.getElementById('appBody');
    xApp.classList.add('modeFade');
  }, [mode]);

  return (
    <div className={ `bg-danger` } style={ { height: window.innerHeight } }>
      <BrowserRouter>
        <div className={ `d-flex flex-fill flex-column bg-${mode.bg}` }>
          {/* HEADER 12% HEIGHT */ }
          <Header mode={ mode } setMode={ setMode } />

          {/* BODY 88% HEIGHT */ }
          <div id="appBody" className={ `d-flex flex-fill bg-${mode.bg}` } style={ { minHeight: `88vh`, marginTop: `12vh` } }>
            <Switch>
              <Route path="/" exact>
                <Home mode={ mode } />
              </Route>
              <Route path="/accounts">
                <AccountPage mode={ mode } />
              </Route>
              <Route path="/inventory">
                <InventoryPage mode={ mode } />
              </Route>
              <Route path="/menu">
                <Menu mode={ mode } />
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
