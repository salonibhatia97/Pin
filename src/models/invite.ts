import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const inviteSchema = new Schema ({
	email: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ['MEMBER', 'ADMIN'],
		default: 'MEMBER',
	}
});

const Invite = mongoose.model('Invite', inviteSchema);
export default Invite;   