import Joi from 'joi';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const inviteUserValidation = async (inviteUserInput: any) => {
	const inviteSchema = Joi.object({
		email: Joi.string().email().required(),
		role: Joi.string().required(),
	});
	const { error } = await inviteSchema.validate(inviteUserInput);
	return error;
};
export default inviteUserValidation; 