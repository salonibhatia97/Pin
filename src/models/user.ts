import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const userSchema = new Schema ({
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	invited: Boolean,
	role: {
		type: String,
		enum: ['MEMBER', 'ADMIN'],
		default: 'MEMBER',
	}
});

const User = mongoose.model('User', userSchema);
export default User;  