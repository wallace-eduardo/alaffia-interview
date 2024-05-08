import { gql } from "https://deno.land/x/graphql_tag@0.0.1/mod.ts";

export const typeDefs = gql`
  type User {
    id: String!
    firstName: String!
    lastName: String!
    email: String!
    role: String!
    createdAt: String!
    facilities: [Facility!]  # List of facilities associated with the user
  }

  type Facility {
    id: String!
    name: String!
    createdAt: String!
    locations: [Location!]  # List of locations belonging to the facility
  }

  type Location {
    id: String!
    state: String!
    zip: String!
    address: String!
    facility: Facility,
    users: [User]
  }

  input UsersByLocationInput {
    state: String!
    zip: String!
  }

  type Query {
    user(id: String): User
    usersByLocation(id: String): Location
  }

  type Mutation {
    addUser(firstName: String, lastName: String, email: String, role: String, facilities: [String]): User
    addFacility(name: String, users: [String], locations: [String]): Facility
    addLocation(state: String, zip: String, address: String, facility: String): Location
  }
`;

// GraphQL types/interfaces
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
  facilities?: Facility[];
}

export interface Facility {
  id: string;
  name: string;
  createdAt: string;
  locations?: Location[];
}

export interface Location {
  id: string;
  state: string;
  zip: string;
  address: string;
}

// Input types
export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface CreateFacilityInput {
  name: string;
}

export interface UsersByLocationInput {
  state?: string;
  zip?: string;
}

// Response type
export interface LocationUsers {
  id: string;
  state: string;
  zip: string;
  address: string;
  facilityId: string;
}