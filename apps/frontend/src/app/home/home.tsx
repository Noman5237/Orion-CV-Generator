
import { useEffect, useState } from 'react';

import styles from './home.module.scss';

export interface HomeProps { }

export function Home(props: HomeProps) {
	// fetch /api
	const [data, setData] = useState(null);
	useEffect(() => {
		fetch('/api')
			.then((res) => res.json())
			.then((data) => setData(data.message));
	}, []);

	return (
		<div>
			<h1>Welcome to Home!</h1>
			{
				data && <p>{data}</p>
			}
		</div>
	);
}

