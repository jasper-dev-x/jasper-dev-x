import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { reduxStore } from './reduxStore';
// import reportWebVitals from './reportWebVitals';

const persistor = persistStore(reduxStore);

// // Keeps old data from staying in device
// // Forces every refresh to wipe data then instantly write over it
// persistor.purge();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ reduxStore }>
      <PersistGate loading={ <div>Loading...</div> } persistor={ persistor }>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
