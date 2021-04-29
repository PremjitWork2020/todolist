import { actionConstants } from './constants';
import axios from 'axios';

export const fetchToDoList = () => async (dispatch) => {
	try {
		const response = await axios.get('http://localhost:3006/todolist');
		const data = await response.data;
		dispatch({
			type: actionConstants.FETCH_LIST,
			payload: data,
		});
	} catch (e) {
		console.log(e);
	}
};

export const addToDoList = (dataToPost) => async (dispatch) => {
	try {
		const response = await axios.post(
			'http://localhost:3006/todolist',
			dataToPost
		);
		const data = await response.data;
		var alertObj = {};
		if (response.status === 201) {
			alertObj.msg = 'Record Added Successfully';
			alertObj.type = 'success';
		} else {
			alertObj.msg = 'Record Addition Failed';
			alertObj.type = 'danger';
		}
		alertObj.show = true;

		dispatch({
			type: actionConstants.ADD_ITEM,
			payload: { data, alertObj },
		});
	} catch (e) {
		console.log(e);
	}
};

export const deleteToDoListItem = (id) => async (dispatch) => {
	try {
		const response = await axios.delete(`http://localhost:3006/todolist/${id}`);
		const data = await response.data;
		var alertObj = {};
		if (response.status === 200) {
			alertObj.msg = 'Record Deleted Successfully';
			alertObj.type = 'success';
		} else {
			alertObj.msg = 'Record Deletion Failed';
			alertObj.type = 'danger';
		}
		alertObj.show = true;
		data.id = id;
		dispatch({
			type: actionConstants.DELETE_ITEM,
			payload: { data, alertObj },
		});
	} catch (e) {
		console.log(e);
	}
};

export const editToDoListItem = (id, dataToEdit) => async (dispatch) => {
	try {
		const response = await axios.put(
			`http://localhost:3006/todolist/${id}`,
			dataToEdit
		);
		const data = await response.data;
		var alertObj = {};
		if (response.status === 200) {
			alertObj.msg = 'Record Edited Successfully';
			alertObj.type = 'success';
		} else {
			alertObj.msg = 'Record Edit Failed';
			alertObj.type = 'danger';
		}
		alertObj.show = true;
		dispatch({
			type: actionConstants.EDIT_ITEM,
			payload: { data, alertObj },
		});
	} catch (e) {
		console.log(e);
	}
};

export const itemExist = () => async (dispatch) => {
	try {
		var alertObj = {};
		alertObj.msg = 'Record Already Exists';
		alertObj.type = 'warning';
		alertObj.show = true;
		dispatch({
			type: actionConstants.ITEM_EXISTS,
			payload: alertObj,
		});
	} catch (e) {
		console.log(e);
	}
};
