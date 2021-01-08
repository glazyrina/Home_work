import React, { memo } from 'react';
import { connect } from 'react-redux';
import {
	editDish as editDishServer,
	moveDish as moveDishServer,
	removeDish as removeDishServer
} from '../../models/AppModel';
import {
	editDishAction,
	moveDishBackAction,
	moveDishForwardAction,
	removeDishAction
} from '../../store/action';

const Dish = ({
	dishName,
	dishId,
	cookId,
	editDishDispatch,
	moveDishBackDispatch,
	moveDishForwardDispatch,
	removeDishDispatch
}) => {
	const editDish = async () => {
		let newDishName = prompt('Введите новое блюдо', dishName);

		if (!newDishName) return;

		newDishName = newDishName.trim();

		if (!newDishName || newDishName === dishName) return;

		const info = await editDishServer({ cookId, dishId, newDishName });
		console.log(info);

		editDishDispatch({ cookId, dishId, newDishName });
	};

	const removeDish = async () => {
		// eslint-disable-next-line no-restricted-globals
		if (confirm(`Блюдо '${dishName}' будет удалено. Продолжить?`)) {
			const info = await removeDishServer({ cookId, dishId });
			console.log(info);

			removeDishDispatch({ cookId, dishId });
		}
	};

	const moveDishBack = async () => {
		try {
			const info = await moveDishServer({
				cookId,
				dishId,
				destCookId: cookId - 1
			});
			console.log(info);

			moveDishBackDispatch({ cookId, dishId });
		} catch (error) {
			console.log(error);
		}
	};

	const moveDishForward = async () => {
		try {
			const info = await moveDishServer({
				cookId,
				dishId,
				destCookId: cookId + 1
			});
			console.log(info);

			moveDishForwardDispatch({ cookId, dishId });
		} catch (error) {
			console.log(error);
		}
	};

	return(
		<div className="ra-cook-dish">
			<div className="ra-cook-dish-text">
				{dishName}
			</div>
			<div className="ra-cook-dish-controls">
				<div className="ra-cook-dish-controls-row">
					<div 
						className="ra-cook-dish-controls-icon left-arrow-icon"
						onClick = {moveDishBack}
					></div>
					<div
						className="ra-cook-dish-controls-icon right-arrow-icon"
						onClick = {moveDishForward}
					></div>
				</div>
				<div className="ra-cook-dish-controls-row">
					<div
						className="ra-cook-dish-controls-icon edit-icon"
						onClick = {editDish}
					></div>
					<div
						className="ra-cook-dish-controls-icon delete-icon"
						onClick = {removeDish}
					></div>
				</div>
			</div>
		</div>
	);
};

const mapDispatchToProps = dispatch => ({
	editDishDispatch: ({ cookId, dishId, newDishName }) =>
		dispatch(editDishAction({ cookId, dishId, newDishName })),
	moveDishBackDispatch: ({ cookId, dishId}) =>
		dispatch(moveDishBackAction({ cookId, dishId})),
	moveDishForwardDispatch: ({ cookId, dishId}) =>
		dispatch(moveDishForwardAction({ cookId, dishId})),
	removeDishDispatch: ({ cookId, dishId}) =>
		dispatch(removeDishAction({ cookId, dishId}))
});

export default connect(
	null,
	mapDispatchToProps
)(memo(Dish))
