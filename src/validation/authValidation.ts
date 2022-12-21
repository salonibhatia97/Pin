/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from 'joi';
const signUpValidation = async (signupInput: any) => {
	const userSchema = Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required().min(4),
		role: Joi.string(),
	});
	const { error } = await userSchema.validate(signupInput);
	console.log(22, error);
	return error;
};
const logInValidation = async (loginInput: any) => {
	const userSchema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required().min(4)
	});
	const { error } = await userSchema.validate(loginInput);
	return error;
};
export { signUpValidation, logInValidation };