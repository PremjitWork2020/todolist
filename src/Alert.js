import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
const Alert = ({ removeAlert }) => {
	const alertObj = useSelector((state) => state.todoReducer.alertObj);
	const { msg, type } = alertObj;
	useEffect(() => {
		setTimeout(() => {
			removeAlert();
		}, 2000);
	}, []);
	return <p className={`alert alert_${type}`}>{msg}</p>;
};

export default Alert;
