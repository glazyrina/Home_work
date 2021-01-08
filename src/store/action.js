const DOWNLOAD_COOKS = 'DOWNLOAD_COOKS';
const ADD_COOK = 'ADD_COOK';
const ADD_DISH = 'ADD_DISH';
const EDIT_DISH = 'EDIT_DISH';
const MOVE_DISH_BACK = 'MOVE_DISH_BACK';
const MOVE_DISH_FORWARD = 'MOVE_DISH_FORWARD';
const REMOVE_DISH = 'REMOVE_DISH';

const downloadCooksAction = (cooks) => ({
	type: DOWNLOAD_COOKS,
	payload: cooks
});

const addCookAction = (cookName) => ({
	type: ADD_COOK,
	payload: cookName
});

const addDishAction = ({ dishName, cookId }) => ({
	type: ADD_DISH,
	payload: {
		cookId,
		dishName
	}
});

const editDishAction = ({ cookId, dishId, newDishName }) => ({
	type: EDIT_DISH,
	payload: {
		cookId,
		dishId,
		newDishName
	}
});

const moveDishBackAction = ({ cookId, dishId}) => ({
	type: MOVE_DISH_BACK,
	payload: {
		cookId,
		dishId,
	}
});

const moveDishForwardAction = ({ cookId, dishId}) => ({
	type: MOVE_DISH_FORWARD,
	payload: {
		cookId,
		dishId,
	}
});

const removeDishAction = ({ cookId, dishId}) => ({
	type: REMOVE_DISH,
	payload: {
		cookId,
		dishId,
	}
});

export {
	DOWNLOAD_COOKS,
	ADD_COOK,
	ADD_DISH,
	EDIT_DISH,
	MOVE_DISH_BACK,
	MOVE_DISH_FORWARD,
	REMOVE_DISH,
	downloadCooksAction,
	addCookAction,
	addDishAction,
	editDishAction,
	moveDishBackAction,
	moveDishForwardAction,
	removeDishAction
};