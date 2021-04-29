import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Main from './Main';
import { fetchToDoList } from './actions/todoActions';
import { useSelector } from 'react-redux';
const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchToDoList());
	}, []);
	return (
		<div className="main_div">
			<div className="inner_div">
				<Main />
			</div>
		</div>
	);
};

export default App;
