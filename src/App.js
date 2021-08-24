import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/home/Home';
import Menu from './pages/menu/Menu';
import NotFound from './pages/NotFound';
import AccountPage from './pages/accounts/Accounts';
import InventoryPage from './pages/inventory/Inventory';
import Cart from './pages/cart/Cart';

function App() {
  const [mode, setMode] = useState({
    bg: sessionStorage.getItem('modeBg') ? sessionStorage.getItem('modeBg') : 'light',
    txt: sessionStorage.getItem('modeTxt') ? sessionStorage.getItem('modeTxt') : 'dark',
  });
  const minHeight = (window.innerHeight - 1) * .88;
  const marginTop = (window.innerHeight - 1) * .12;
  // useEffect(() => {
  //   var xApp = document.getElementById('appBody');
  //   xApp.classList.add('modeFade');
  // }, [mode]);

  return (
    <div className={ `bg-info` } style={ { height: window.innerHeight - 1 } }>
      <BrowserRouter>
        <div className={ `d-flex flex-fill flex-column bg-${mode.bg} text-${mode.txt}` }>
          {/* HEADER 12% HEIGHT */ }
          <Header mode={ mode } setMode={ setMode } />

          {/* BODY 88% HEIGHT */ }
          <div className={ `d-flex flex-fill bg-${mode.bg} text-${mode.txt}` } style={ { minHeight, marginTop } }>
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
              <Route path="/cart">
                <Cart mode={ mode } />
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
