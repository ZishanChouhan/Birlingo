'use strict';

export default class HashExtension {
	static merge(target, source) {
		const newObj = typeof target == 'object' ? Object.assign({}, target) : {};
		for (const prop in source) {
			if (target[prop] == null || typeof target[prop] === 'undefined') {
				newObj[prop] = source[prop];
			} else {
				newObj[prop] = typeof source[prop] === 'object' ? this.merge(target[prop], source[prop]) : source[prop];
			}
		}
		return newObj;
	}
}
