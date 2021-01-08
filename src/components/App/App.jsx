import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { addCook, getCooks } from '../../models/AppModel';
import {
	addCookAction,
	downloadCooksAction
} from '../../store/action';
import Cook from '../Cook/Cook';
import './App.css'

class App extends PureComponent {
	state = {
		isInputShown: false,
		inputValue: ''
	};

	async componentDidMount() {
		const cooks = await getCooks();
		this.props.downloadCooksDispatch(cooks);
	}

	showInput = () => this.setState({ isInputShown: true });

	onInputChange = ({ target: { value } }) => this.setState({
		inputValue: value
	});

	onKeyDown = async (event) => {
		if (event.key === 'Escape') {
			this.setState({
				isInputShown: false,
				inputValue: ''
			});
			return;
		}

		if (event.key === 'Enter') {
			if (this.state.inputValue) {
				const info = await addCook({
					cookName: this.state.inputValue,
					dishes: []
				});
				console.log(info);

				this.props.addCookDispatch(this.state.inputValue);
			}

			this.setState({
				isInputShown: false,
				inputValue: ''
			})
		}
	};

	render() {
		const { isInputShown, inputValue } = this.state;
		const { cooks } = this.props;

		return (
			<Fragment>
				<header id="main-header">
					Личный кабинет
					<div id="author">
						Реджина Ховард
						<div className="avatar"></div>
					</div>
				</header>
				<main id="ra-container">
					{cooks.map((cook, index) => (
						<Cook
							cookName = {cook.cookName}
							cookId = {index}
							dishes={cook.dishes}
							key = {`list${index}`}
						/>
					))}
					<div className="ra-cook">
						{!isInputShown && (
							<header 
								className="ra-cook-header"
								onClick = {this.showInput}
							>
								Добавить повара
							</header>
						)}
						{isInputShown && (
							<input
								type="text"
								id="add-cook-input"
								placeholder="Имя повара"
								value = { inputValue }
								onChange = {this.onInputChange}
								onKeyDown={this.onKeyDown}
							/>
						)}
					</div>
				</main>
			</Fragment>
		)
	}
}

const mapStateToProps = ({ cooks }) => ({ cooks });

const mapDispatchToProps = dispatch => ({ 
	addCookDispatch: (cookName) => dispatch(addCookAction(cookName)),
	downloadCooksDispatch: (cooks) => dispatch(downloadCooksAction(cooks))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
