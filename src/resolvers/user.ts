import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import { generateToken }  from '../helpers/auth';
import { signUpValidation, logInValidation } from '../validation/authValidation';
import inviteUserValidation from '../validation/inviteValidation';

export default { 
	Query: { 
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		allUsers: async(_: any, __:any, context: any) => {
			const users = await context.models.User.find();
			return users;
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		getUser: async(_: any, args: any, context: any) => context.models.User.findOne(args),
	}, 
	Mutation: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		createUser: async(_: any, args: any , context: any) => {
			const { input } = args;
			const error = await signUpValidation(input);
			if(error) {
				throw new Error(error.details[0].message);
			}
			const users = await context.models.User.find({email: input.email});
			if(users.length !== 0){
				throw new Error('User with this email already exists');
			}
			const hashPassword = await bcrypt.hash(input.password, 10);
			const invitedUser = await context.models.Invite.findOne({email: input.email});
			const newUser = new context.models.User({
				...input,  
				password: hashPassword,
				invited: invitedUser ? true : false,
				role: invitedUser?.role,
			});
			const user = await newUser.save();
			return user;
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
		logIn: async(_: any, args: any , context: any) => {
			const { input } = args;
			const error = await logInValidation(input);
			if(error){
				throw new Error(error.details[0].message);
			}
			const user = await context.models.User.findOne({ email: input.email});
			if(!user) { 
				throw new Error('Requested User does not exist!');
			}
			const passwordIsValid = await bcrypt.compare(input.password, user.password);
			if(!passwordIsValid){
				throw new Error('Password does not match');
			}
			const token = generateToken({
				// email: user.email, 
				id: user._id,
				role: user.role,
			});
			return { ...user._doc, token };
		}, 
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		inviteUser : async(_:any, args: any, context: any) => {
			const { input } = args;
			const error = await inviteUserValidation(input);
			if(error){
				throw new Error(error.details[0].message);
			}
			const invites = await context.models.Invite.find({email: input.email});
			if(invites.length!==0){
				throw new Error('User is already invited');
			}
			const newInvite = new context.models.Invite(input);
			const invite = await newInvite.save();
			return invite;
		}
	}  
};  