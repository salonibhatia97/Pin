export default `
directive @authenticated on FIELD_DEFINITION
  type Pin {
    _id: ID! 
    message: String!
    createdBy: User!
  }
  input CreatePinInput { 
    message: String
  } 
  type Query {
    getPin(_id: ID!): Pin!
    allPins: [Pin!]!
  }
  type Mutation { 
    createPin(input: CreatePinInput): Pin!
  }
  `;