import { Route, Routes, Link } from 'react-router-dom';

import styles from './app.module.scss';
import AuthPage from './Auth/AuthPage';

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

					<li>
						<Link to="/auth">auth</Link>
					</li>
				</ul>
			</div>
			<Routes>
				<Route
					path="/"
					element={
						<div>
							<Home />
							<Link to="/page-2">Click here to go to page 2.</Link>
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
					<Route
					path="/auth"
					element={
						<AuthPage></AuthPage>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
