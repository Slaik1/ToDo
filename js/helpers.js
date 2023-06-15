var tryCatchWrapper = function (func) {
	return async (...args) => {
			try {
					return await func(...args)
			} catch(e) {
					alertFormError(e)
			}
	}
}
