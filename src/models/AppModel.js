const getCooks = async () => {
	const response = await fetch('http://localhost:4321/cooks');
	const cooks = await response.json();

	return cooks;
}

const addCook = async (cook) => {
	const response = await fetch('http://localhost:4321/cooks', {
		method: 'POST',
		body: JSON.stringify(cook),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const { info } = await response.json();

	return info;
};

const addDish = async ({ cookId, dishName }) => {
	const response = await fetch(`http://localhost:4321/cooks/${cookId}/dishes`, {
		method: 'POST',
		body: JSON.stringify({ dishName }),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const { info } = await response.json();

	return info;
};

const editDish = async ({ cookId, dishId, newDishName }) => {
	const response = await fetch(`http://localhost:4321/cooks/${cookId}/dishes/${dishId}`, {
		method: 'PATCH',
		body: JSON.stringify({ newDishName }),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const { info } = await response.json();

	return info;
};

const removeDish = async ({ cookId, dishId }) => {
	const response = await fetch(`http://localhost:4321/cooks/${cookId}/dishes/${dishId}`, {
		method: 'DELETE',
	});

	const { info } = await response.json();

	return info;
};

const moveDish = async ({ cookId, dishId, destCookId }) => {
	const response = await fetch(`http://localhost:4321/cooks/${cookId}`, {
		method: 'PATCH',
		body: JSON.stringify({ dishId, destCookId }),
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (response.status !== 200) {
		const { error } = await response.json();
		return Promise.reject(error);
	}

	const { info } = await response.json();

	return info;
};

export {
	getCooks,
	addCook,
	addDish,
	editDish,
	removeDish,
	moveDish
};