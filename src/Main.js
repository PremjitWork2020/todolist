import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from './Alert';
import List from './List';
import {
	addToDoList,
	deleteToDoListItem,
	editToDoListItem,
	itemExist,
	fetchToDoList,
} from './actions/todoActions';
const Main = () => {
	const dispatch = useDispatch();
	const todoList = useSelector((state) => state.todoReducer.todolist);
	const alertObj = useSelector((state) => state.todoReducer.alertObj);
	const [name, setName] = useState('');
	const [editId, setEditId] = useState(null);
	const [editing, setEditing] = useState(false);
	const [alert, setAlert] = useState({ msg: '', type: '', show: false });

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!name) {
			return;
		} else if (editing) {
			if (todoList.find((item) => item.name === name)) {
				dispatch(itemExist());
			} else {
				dispatch(editToDoListItem(editId, { id: editId, name: name }));
				setName('');
				setEditId(null);
			}
		} else if (todoList.find((item) => item.name === name)) {
			dispatch(itemExist());
		} else {
			const newItem = {
				id: new Date().getTime().toString(),
				name: name,
			};
			setName('');
			dispatch(addToDoList(newItem));
		}
		setEditing(false);
	};
	const editItem = (id) => {
		setEditing(true);
		const editItem = todoList.find((item) => item.id === id);
		setEditId(editItem.id);
		setName(editItem.name);
	};
	const deletItem = (id) => {
		setAlert({
			...alert,
			msg: 'Record Deleted Successfully',
			show: true,
			type: 'danger',
		});
		setName('');
		dispatch(deleteToDoListItem(id));
	};
	const clearItems = () => {
		setAlert({
			...alert,
			msg: 'Record Cleared Successfully',
			show: true,
			type: 'danger',
		});
		setName('');
		setEditing(false);
	};
	const showAlert = () => {
		setAlert({ ...alert, show: false });
	};
	return (
		<div className="main_div">
			<div className="inner_div">
				<form onSubmit={handleSubmit} className="form_control">
					{alert.show ? (
						<Alert {...alert} removeAlert={showAlert} />
					) : (
						<h3 className="form_title">Todo-List</h3>
					)}

					<div className="form_input_box">
						<input
							className="inputfield"
							type="text"
							placeholder="e.g  Gym training"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<button className="form_add_btn" type="submit">
							Add item
						</button>
					</div>
				</form>

				<List editItem={editItem} deletItem={deletItem}></List>
				{todoList.length > 0 ? (
					<button onClick={() => clearItems()} className="btn_clear">
						Clear List
					</button>
				) : (
					''
				)}
			</div>
		</div>
	);
};

export default Main;
