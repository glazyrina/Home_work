import React, { memo } from 'react';
import { connect } from 'react-redux';
import { addDish as addDishServer } from '../../models/AppModel';
import {
	addDishAction
} from '../../store/action';
import Dish from '../Dish/Dish';

const Cook = ({
	cookName,
	cookId,
	dishes,
	addDishDispatch
}) => {
	const addDish = async () => {
		let dishName = prompt('Введите название блюда');

		if (!dishName) return;

		dishName = dishName.trim();

		if (!dishName) return;

    const info = addDishServer({ cookId, dishName });
    console.log(info);
		addDishDispatch({ dishName, cookId });
	};

	return(<div className="ra-cook">
      <header className="ra-cook-header">
        {cookName}
      </header>
      <div className="ra-cook-dishes">
      	{dishes.map((dish, index) => (
      		<Dish
      			dishName = {dish}
      			dishId = {index}
      			cookId = {cookId}
      			key = {`list${cookId}-dish${index}`}
      		/>
      	))}
      </div>
      <footer
      	className="ra-cook-add-dish"
      	onClick = {addDish}
      >
        Добавить блюдо
      </footer>
    </div>);
};

const mapDispatchToProps = dispatch => ({
	addDishDispatch: ({ cookId, dishName }) => 
		dispatch(addDishAction({ dishName, cookId }))
})

export default connect(
	null,
	mapDispatchToProps
)(memo(Cook));
