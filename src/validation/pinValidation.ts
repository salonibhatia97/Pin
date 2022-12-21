import Joi from 'joi';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createPinValidation = async (createPinInput: any) => {
	const pinSchema = Joi.object({
		message: Joi.string().required(),
	});
	const { error } = await pinSchema.validate(createPinInput);
	return error;
};
export default createPinValidation;