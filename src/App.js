import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/home';
import NotFound from './pages/NotFound';
import ToDoList from './todos/ToDoList';

function App() {
  const [mode, setMode] = useState(sessionStorage.getItem('mode') ? sessionStorage.getItem('mode') : 'light');
  useEffect(() => {
    var xApp = document.getElementById('appBody');
    xApp.classList.add('modeFade');
  }, [mode]);
  
  const todos = [
    { text: 'Test ToDo List' }
  ];

  return (
    <div className={ `bg-${mode}` } style={ { height: window.innerHeight } }>
      <BrowserRouter>
        <div  className={`d-flex flex-fill flex-column align-items-center bg-${mode}`}>
          {/* HEADER 12% HEIGHT */ }
          <Header mode={ mode } setMode={ setMode } />

          {/* BODY 88% HEIGHT */ }
          <div id="appBody" className={ `d-flex container-fluid bg-${mode}` } style={ { height: window.innerHeight * .88, marginTop: window.innerHeight * .12 } }>
            <Switch>
              <Route path="/" exact>
                <Home mode={ mode } />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>

      </BrowserRouter>
      {/* <ToDoList todos={ todos } /> */ }
    </div>
  );
}

export default App;
