import jwt from 'jsonwebtoken';
const generateToken = (user: string | object | Buffer) => {
	const token = jwt.sign(user, 'pin', {
		expiresIn: '4hr'
	}); 
	return token; 
}; 

const decryptToken = (token : string) => {
	try{
		const user = jwt.verify(token, 'pin');
		return user;
	} catch (error) {
		return null;
	}
};

export {
	generateToken,
	decryptToken
};
