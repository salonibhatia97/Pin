export default `
directive @authorized(role: Role) on FIELD_DEFINITION
enum Role {
  MEMBER
  ADMIN
}
type Invite {
  email: String!
  role : Role!
}
input InviteUserInput {
  email: String
  role: Role!  
}

type Mutation {
  inviteUser(input: InviteUserInput!) : Invite! @authorized(role : ADMIN)
}
`;