export default `
directive @authenticated on FIELD_DEFINITION
enum Role {
  MEMBER
  ADMIN
}
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    invited: Boolean!
    role: Role!
  }
  type LogInUserOutput {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    token: String!
  }

  input CreateUserInput { 
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    role: Role
  }
  input LogInInput {
    email: String!
    password: String!
  }

  type Query {
    allUsers: [User]!
    getUser(_id: ID!): User!
    
  }
  type Mutation {
    createUser(input: CreateUserInput): User!,
    logIn(input: LogInInput): LogInUserOutput! 
  }
  `; 