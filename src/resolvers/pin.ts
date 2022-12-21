// import  fs  from 'fs';
// import path from 'path'; 
// import AWS from 'aws-sdk'; 
import dotenv from 'dotenv'; 
dotenv.config({path: './.env'});
// const s3 = new AWS.S3({  
// 	accessKeyId: process.env.AWS_ACCESS_KEY_ID,   
// 	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
// 	region: process.env.AWS_DEFAULT_REGION,  
// });  
import createPinValidation from '../validation/pinValidation';
export default {
	Query: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		getPin: async(_: any, args: any, context: any) => context.models.Pin.findOne(args),
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		allPins: async(_: any, __:any, context: any) => {
			const pins = await context.models.Pin.find();  
			return pins; 
		},
	},
	Mutation: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
		createPin: async(_: any, args: any, context: any) => {
			const { input } = args;
			const error = await createPinValidation(input);
			if(error){
				throw new Error(error.details[0].message);
			}
			const newPin = new context.models.Pin({
				...input,
				createdBy: context.user && context.user.id, 
			}); 
			const pin = await newPin.save();
			return pin;
		}, 
	}, 
	Pin: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		createdBy: async (pin: any, _: any, context: any) => {
			const user = await context.models.User.findOne({_id: pin.createdBy});
			return user;
		}
	},
};    