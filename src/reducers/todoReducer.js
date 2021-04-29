import { actionConstants } from '../actions/constants';

const initialState = {
	todolist: [],
	alertObj: { msg: '', type: '', show: false },
};

const todoReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionConstants.FETCH_LIST:
			return {
				...state,
				todolist: action.payload,
			};
		case actionConstants.ADD_ITEM:
			const addArr = state.todolist;
			addArr.push(action.payload.data);
			return {
				...state,
				todolist: addArr,
				alertObj: action.payload.alertObj,
			};
		case actionConstants.DELETE_ITEM:
			const deleteArr = state.todolist;
			return {
				...state,
				todolist: deleteArr.filter(
					(item) => item.id !== action.payload.data.id
				),
				alertObj: action.payload.alertObj,
			};
		case actionConstants.EDIT_ITEM:
			const editArr = state.todolist;
			const newArr = editArr.map((item) => {
				if (item.id === action.payload.data.id) {
					return { ...item, name: action.payload.data.name };
				}
				return item;
			});
			return {
				...state,
				todolist: newArr,
				alertObj: action.payload.alertObj,
			};
		case actionConstants.ITEM_EXISTS:
			return {
				...state,
				alertObj: action.payload.alertObj,
			};
		default:
			return {
				...state,
			};
	}
};

export default todoReducer;
