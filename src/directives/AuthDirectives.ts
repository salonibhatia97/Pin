import { SchemaDirectiveVisitor } from 'apollo-server';
import { defaultFieldResolver } from 'graphql';
class AuthenticationDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field){ 
		const resolver = field.resolve || defaultFieldResolver;
		field.resolve =  (root, args, context, info) => {
			if(!context.user) {
				throw new Error('User not authenticated');
			}
			return resolver(root, args, context, info);
		};   
	}
} 

class AuthorizationDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const resolver = field.resolve || defaultFieldResolver;

		field.resolve = (root, { role, ...rest }, context, info) => {
			if(role !== context.user.role){
				throw new Error('User not authorized');
			}
			return resolver(root, rest, context, info);
		};
	}
}
export { AuthenticationDirective, AuthorizationDirective }; 