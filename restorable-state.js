'use strict';

const Thing = require('./thing');
const State = require('./state');

/**
 * Restorable state capability. Restorable state is used for those things
 */
module.exports = Thing.capability(Thing => class extends Thing.with(State) {
	static availableAPI(builder) {
		builder.action('restorableState')
			.description('Get the properties that will be captured')
			.returns('array')
			.done();

		builder.action('captureState')
			.description('Capture parts of the current state that can be restored')
			.returns('object')
			.done();

		builder.action('setState')
			.description('Restore previously captured state')
			.argument('object', false, 'The state to restore')
			.returns('object')
			.done();
	}

	/**
	 * Get that this provides the state capability.
	 */
	static get capability() {
		return 'restorable-state';
	}

	constructor(...args) {
		super(...args);
	}

	/**
	 * Get the properties that can be captured and restored.
	 */
	get restorableState() {
		return [];
	}

	/**
	 * Capture the current state.
	 */
	captureState() {
		const result = {};
		for(const property of this.restorableState) {
			result[property] = this.state[property];
		}
		return result;
	}

	/**
	 * Restore a previously captured state.
	 *
	 * @param {object} state
	 */
	setState(state) {
		return Promise.resolve(this.changeState(state))
			.then(() => this.state);
	}

	/**
	 * Actually change to the given state.
	 *
	 * @param {object} state
	 */
	changeState(state) {
		return Promise.resolve();
	}
});
