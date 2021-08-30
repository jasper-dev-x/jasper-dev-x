import './App.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/home/Home';
import Menu from './pages/menu/Menu';
import NotFound from './pages/NotFound';
import InventoryList from './pages/inventory/InventoryList';
import InventoryForm from './pages/inventory/InventoryForm';
import Cart from './pages/cart/Cart';
import AccountForm from './pages/accounts/AccountForm';
import AccountList from './pages/accounts/AccountList';

function App() {
  const mode = useSelector(state => state.mode);
  const minHeight = (window.innerHeight - 1) * .88;
  const marginTop = (window.innerHeight - 1) * .12;
  // useEffect(() => {
  //   var xApp = document.getElementById('appBody');
  //   xApp.classList.add('modeFade');
  // }, [mode]);

  return (
    <div className={ `bg-${mode.bg}` } style={ { height: window.innerHeight - 1 } }>
      <BrowserRouter>
        <div className={ `d-flex flex-fill flex-column bg-${mode.bg} text-${mode.txt}` }>
          {/* HEADER 12% HEIGHT */ }
          <Header />

          {/* BODY 88% HEIGHT */ }
          <div className={ `d-flex flex-fill bg-${mode.bg} text-${mode.txt}` } style={ { minHeight, marginTop } }>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/accounts" exact>
                <AccountList />
              </Route>
              <Route path="/accounts/create">
                <AccountForm />
              </Route>
              <Route path="/inventory" exact>
                <InventoryList />
              </Route>
              <Route path="/inventory/create">
                <InventoryForm />
              </Route>
              <Route path="/menu">
                <Menu />
              </Route>
              <Route path="/cart">
                <Cart />
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
