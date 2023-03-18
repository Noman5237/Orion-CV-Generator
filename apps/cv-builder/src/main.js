import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/app';
import { Provider } from 'react-redux'
const root = ReactDOM.createRoot(document.getElementById('root'));

import { store } from './app/store/store';

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>,
  </BrowserRouter>
);
