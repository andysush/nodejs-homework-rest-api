// const { HttpError } = require("../helpers");

// const validateBody = (schema) => {
// 	const f = (req, res, next) => {
// 		const { error } = schema.validate(req.body);
// 		if (error) {
// 			next(HttpError(400, error.message));
// 		}
// 		next();
// 	};

// 	return f;
// };

// module.exports = validateBody;

const { HttpError } = require("../helpers");

const validateBody = (schema) => {
	const func = (req, res, next) => {
		console.log(req.body);
		const { error } = schema.validate(req.body);
		if (error) {
			next(HttpError(400, error.message));
		}
		next();
	};

	return func;
};

module.exports = validateBody;
