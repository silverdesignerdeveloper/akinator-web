import React, { Component, PropTypes } from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import LikeIcon from 'material-ui/svg-icons/action/favorite'
import DislikeIcon from 'material-ui/svg-icons/content/clear'
import NormasButton from 'material-ui/RaisedButton'
import s from './ActionButtons.scss'
import Snackbar from 'material-ui/Snackbar'

import {
	LOADING,
	SUCCESS,
	ERROR
} from '../../constants/actionTypes'

export default class ActionButtons extends Component {
	constructor () {
		super()
		this.state = {
			open: false,
			message: ''
		}
	}
	clickHandler (feedback) {
		this.handleSnackbar(feedback)
		const { finder, addToHistory, sendFeedback } = this.props
		const { gift } = finder
		addToHistory([finder.questionId, feedback])
		sendFeedback()
	}

	handleSnackbar (feedback) {
		const messages = {
			1: ['Впредь постараюсь лучше..', 'Вот как!', 'Ого'],
			2: ['Я запомнил твой выбор', 'Я думаю следующий подойдёт!',
				'Следующий будет лучше предыдущего.'],
			3: ['Хороший выбор', 'Интересно..', 'Я запомнил..', 'Я посмотрю..']
		}
		this.setState({
			open: true,
			message: messages[feedback][Math.floor(Math.random() * messages[feedback].length)]
		})

		setTimeout(() => {
			this.setState({
				open: false,
			})
		}, 8000)
	}
	render () {
		const { status } = this.props.finder
		return (
			<div className={s.container}>
				<div className={s.left}>
					<FloatingActionButton
						disabled={status === LOADING}
						onClick={() => this.clickHandler(1)}>
						<DislikeIcon />
					</FloatingActionButton>
				</div>
				<div className={s.middle} onClick={() => this.clickHandler(2)}>
					<NormasButton
						disabled={status === LOADING}
						label='вообще нормас' />
				</div>
				<div className={s.right}>
					<FloatingActionButton secondary
						disabled={status === LOADING}
						onClick={() => this.clickHandler(3)}>
					<LikeIcon />
					</FloatingActionButton>
				</div>
				<Snackbar
					open={this.state.open}
					message={this.state.message}
					autoHideDuration={4000}
				/>
			</div>
		)
	}
}

ActionButtons.propTypes = {
	finder: PropTypes.object.isRequired,
	addToHistory: PropTypes.func.isReqruired,
	sendFeedback: PropTypes.func.isRequired
}
