const express = require('express');
const app = express();
const { readData, writeData } = require('./utils');

const port = 4321;
const hostname = 'localhost';

let cooks = [];

// Middleware для разрешения CORS-запросов
app.use((request, response, next) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// Middleware для разрешения CORS-запросов
app.use((request, response, next) => {
	console.log(
		(new Date()).toISOString(),
		request.method,
		request.originalUrl
	);
	next();
});

// Middleware для правильного представления request.body
app.use(express.json());

//-------- Routes - пути, по которым идут запросы ----------

app.options('/*', (request, response) => {
	response.statusCode = 200;
	response.send('OK');
});

app.get('/cooks', async (request, response) => {
	cooks = await readData();
	response.setHeader('Content-Type', 'application/json');
	response.json(cooks);
});

app.post('/cooks', async (request, response) => {
	cooks.push(request.body);
	await writeData(cooks);

	response.setHeader('Content-Type', 'application/json');
	response.status(200).json({
		info: `Cook '${request.body.cookName}' was successfully added`
	});
});

app.post('/cooks/:cookId/dishes', async (request, response) => {
	const { dishName } = request.body;
	const cookId = Number(request.params.cookId);

	cooks[cookId].dishes.push(dishName);
	await writeData(cooks);

	response.setHeader('Content-Type', 'application/json');
	response.status(200).json({
		info: `Dish '${dishName}' was successfully added in cook '${cooks[cookId].cookName}'`
	});
});

app.patch('/cooks/:cookId/dishes/:dishId', async (request, response) => {
	const { newDishName } = request.body;
	const cookId = Number(request.params.cookId);
	const dishId = Number(request.params.dishId);

	cooks[cookId].dishes[dishId] = newDishName;
	await writeData(cooks);

	response.setHeader('Content-Type', 'application/json');
	response.status(200).json({
		info: `Dish '${dishId}' in '${cooks[cookId].cookName}' was successfully renamed`
	});
});

app.delete('/cooks/:cookId/dishes/:dishId', async (request, response) => {
	const cookId = Number(request.params.cookId);
	const dishId = Number(request.params.dishId);

	const removedDish = cooks[cookId].dishes[dishId];
	cooks[cookId].dishes = cooks[cookId].dishes.filter(
		(dish, index) => index !== dishId
	);
	await writeData(cooks);

	response.setHeader('Content-Type', 'application/json');
	response.status(200).json({
		info: `Dish '${removedDish}' was successfully removed`
	});
});

app.patch('/cooks/:cookId', async (request, response) => {
	const { dishId, destCookId } = request.body;
	const cookId = Number(request.params.cookId);

	if (destCookId < 0 || destCookId >= cooks.lenght) {
		response.setHeader('Content-Type', 'application/json');
		response.status(400).json({
			error: `Wrong destination cook ID: ${destCookId}`
		});
	}

	const movedDish = cooks[cookId].dishes[dishId];
	cooks[cookId].dishes = cooks[cookId].dishes.filter(
		(dish, index) => index !== dishId
	);
	cooks[destCookId].dishes.push(movedDish);
	await writeData(cooks);

	response.setHeader('Content-Type', 'application/json');
	response.status(200).json({
		info: `Dish '${movedDish}' was successfully moved`
	});
});

app.listen(port, hostname, (err) => {
	if (err) {
		console.log('Error: ', err);
	}

	console.log(`Server is working on '${hostname}:${port}'`);
});