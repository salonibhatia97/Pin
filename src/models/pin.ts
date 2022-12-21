import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const pinSchema = new Schema ({
	message: {
		type: String, 
		required: true
	},
	createdBy: {  
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
});

const Pin = mongoose.model('Pin', pinSchema);
export default Pin;  