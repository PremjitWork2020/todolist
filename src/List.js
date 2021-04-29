import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
const List = ({ list, editItem, deletItem }) => {
	const todoList = useSelector((state) => state.todoReducer.todolist);
	return (
		<div className="list">
			<div>
				{todoList.map((item) => {
					return (
						<div key={item.id} className="list_item">
							<p className="title">{item.name}</p>
							<div className="btn_section">
								<button
									type="button"
									className="btn_edit"
									onClick={() => editItem(item.id)}
								>
									<FaEdit />
								</button>
								<button
									type="button"
									className="btn_delete"
									onClick={() => deletItem(item.id)}
								>
									<FaTrash />
								</button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default List;
