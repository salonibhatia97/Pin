// import express from 'express';
// import { makeExecutableSchema } from 'graphql-tools';
// import { graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import path from 'path';
import { ApolloServer } from 'apollo-server';
import {
	fileLoader,
	mergeTypes,
	mergeResolvers,
} from 'merge-graphql-schemas';
import models from './models'; 
import { decryptToken } from './helpers/auth';

import { AuthenticationDirective, AuthorizationDirective }from './directives/AuthDirectives';
mongoose.connect('mongodb+srv://saloni:saloniatttn@gql-pin.6riy4eo.mongodb.net/?retryWrites=true&w=majority')
	.then(() => console.log('Connected to MongoDB!'))
	.catch((err) => console.log('Errror:' , err)); 

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './types')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const server = new ApolloServer({
	typeDefs, 
	resolvers,
	schemaDirectives: {
		authenticated: AuthenticationDirective,
		authorized: AuthorizationDirective
	},
	uploads: false,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	context({req}: any) {
		const token = req.headers.authtoken;
		const user = decryptToken(token);
		return{
			models,
			user
		}; 
	},
});

server.listen(4000)
	.then(() => console.log('Server is runnung on 4000'))
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	.catch(({err}: any) => console.log('Error when starting server' + err));
