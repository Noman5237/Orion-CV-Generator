import { Route, Routes, Link } from 'react-router-dom';

import styles from './app.module.scss';
import { CVPage } from './cv/cv-page';

import { Home } from './home/home';

export function App() {
  return (
    <>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <CVPage />
            </div>
          }
        />
        <Route
          path="/page-2"
          element={
            <div>
              Page 2
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
