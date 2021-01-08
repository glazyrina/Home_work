import {
	DOWNLOAD_COOKS,
	ADD_COOK,
	ADD_DISH,
	EDIT_DISH,
	MOVE_DISH_BACK,
	MOVE_DISH_FORWARD,
	REMOVE_DISH
} from './action';

const initialState = {
	cooks: []
};

export default function reducer(state = initialState, { type, payload }) {
	switch(type) {
		case DOWNLOAD_COOKS:
			return {
				...state,
				cooks: payload
			};

		case ADD_COOK:
			return {
				...state,
				cooks: [
					...state.cooks,
					{
						cookName: payload,
						dishes: []
					}
				]
			};

		case ADD_DISH:
			return {
				...state,
				cooks: state.cooks.map(
					(cook, index) => index !== payload.cookId
						? { ...cook }
						: { ...cook, dishes: [...cook.dishes, payload.dishName] }
				)
			};

		case EDIT_DISH:
			return {
				...state,
				cooks: state.cooks.map(
					(cook, index) => index !== payload.cookId
						? { ...cook }
						: {
							...cook,
							dishes: cook.dishes.map(
								(dish, dishIndex) => dishIndex === payload.dishId
									? payload.newDishName
									: dish
							)
						}
				)
			};

		case MOVE_DISH_BACK:
			if (payload.cookId === 0) return state;
			const movedBackDish = state.cooks[payload.cookId].dishes[payload.dishId];
			const backDishes = state.cooks[payload.cookId].dishes.filter(
				dish => dish !== movedBackDish
			);
			return {
				...state,
				cooks: state.cooks.map((cook, index) => {
					if (index === payload.cookId - 1) {  
						return {
							...cook,
							dishes: [...cook.dishes, movedBackDish]
						};
					}

					if (index === payload.cookId) {
						return {
							...cook,
							dishes: backDishes  
						};
					}

					return { ...cook };
				})
			};

		case MOVE_DISH_FORWARD:
			if (payload.cookId === state.cooks.lenght - 1) return state;
			const movedForwardDish = state.cooks[payload.cookId].dishes[payload.dishId];
			const forwardDishes = state.cooks[payload.cookId].dishes.filter(
				dish => dish !== movedForwardDish
			);
			return {
				...state,
				cooks: state.cooks.map((cook, index) => {
					if (index === payload.cookId + 1) {  
						return {
							...cook,
							dishes: [...cook.dishes, movedForwardDish]
						};
					}

					if (index === payload.cookId) {
						return {
							...cook,
							dishes: forwardDishes
						};
					}

					return { ...cook };
				})
			};

		case REMOVE_DISH:
			const removedDish = state.cooks[payload.cookId].dishes[payload.dishId];
			const dishes = state.cooks[payload.cookId].dishes.filter(
				dish => dish !== removedDish
			);
			return {
				...state,
				cooks: state.cooks.map(
					(cook, index) => index === payload.cookId
						? {
								...cook,
								dishes
						}
						: { ...cook }
				)
			};

		default:
			return state;
	}

}