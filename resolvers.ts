import { connect } from "./dataProvider.ts";
import * as types from "./typedefs.ts";

const users = async (locationUser: types.LocationUsers, args: any, context: any):
    Promise<types.User[] | null> => {
    using connection = await connect();
    const result = await connection.queryObject<types.User>`
          SELECT user_id, username, email, role_name 
          FROM "user
          JOIN "Roles" ON (role_id)
        `;
    console.log(result.rows);
    return result.rows;
};

const user = async (parent: any, args: { id: string }, context: any):
    Promise<types.User | null> => {
    using connection = await connect();
    const result = await connection.queryObject<types.User>`
          SELECT user_id, username, email, role_name 
          FROM "user"
          WHERE user_id = ${args.id}
        `;
    console.log(result.rows[0]);
    return result.rows[0];
};

// const usersByLocation = async (locationUser: types.LocationUsers, args: any, context: any): 
//     Promise<types.User[] | null> => {

//     locationUser.id
//     using connection = await connect();
//     const result = await connection.queryObject<types.User>`
//           SELECT user_id, username, email, role_name 
//           FROM "user"
//           JOIN user_facility ON (user_id)
//           JOIN facility_location ON (facility_id)
//           WHERE location_id = ${args.id}
//         `;
//     console.log(result.rows);
//     return result.rows;
// };


// export const resolvers = {
//     Query: {
//         user,
//         usersByLocation: (parent: any, args: { input: types.UsersByLocationInput }, context: any) => types.LocationUsers[] | null;
//     };
//     Mutation: {
//         createUser: (parent: any, args: { input: types.CreateUserInput }, context: any) => types.User | null;
//         createFacility: (parent: any, args: { input: types.CreateFacilityInput }, context: any) => types.Facility | null;
//     };
//     User: {
//         facilities: (user: User, args: any, context: any) => types.Facility[] | null;
//     };
//     LocationUsers: {
//         facility: (locationUser: types.LocationUsers, args: any, context: any) => types.Facility | null;
//         users
//     };
// }

// Mocked data
const users = [
    { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', roleId: '1', createdAt: new Date().toISOString() },
    { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', roleId: '2', createdAt: new Date().toISOString() },
];

const facilities = [
    { id: '1', name: 'Hospital A', createdAt: new Date().toISOString() },
    { id: '2', name: 'Clinic B', createdAt: new Date().toISOString() },
];

const roles = [
    { id: '1', name: 'Doctor' },
    { id: '2', name: 'Administrator' },
];

const userFacilities = [
    { userId: '1', facilityId: '1' },
    { userId: '2', facilityId: '2' },
];

const facilityLocations = [
    { facilityId: '1', locationId: '1' },
    { facilityId: '2', locationId: '2' },
];

const locations = [
    { id: '1', facilityId: '1', state: 'CA', zip: '12345', address: '123 Main St' },
    { id: '2', facilityId: '2', state: 'NY', zip: '54321', address: '456 Elm St' },
];

export const resolvers = {
    Query: {
        user,
        usersByLocation: (_: any, { input }: { input: any }) => {
            const { state, zip } = input;
            const locationUsers = locations
                .filter(location => (!state || location.state === state) && (!zip || location.zip === zip))
                .map(location => ({
                    id: location.id,
                    state: location.state,
                    zip: location.zip,
                    address: location.address,
                    facility: facilities.find(facility => facility.id === location.facilityId),
                    users: userFacilities
                        .filter(uf => uf.facilityId === location.facilityId)
                        .map(uf => users().find(user => user.id === uf.userId)),
                }));
            return locationUsers;
        },
    },
    User: {
        role: (user: any) => roles.find(role => role.id === user.roleId)?.name,
        facilities: (user: any) => userFacilities
            .filter(uf => uf.userId === user.id)
            .map(uf => facilities.find(facility => facility.id === uf.facilityId)),
    },
    Facility: {
        locations: (facility: any) => facilityLocations
            .filter(fl => fl.facilityId === facility.id)
            .map(fl => locations.find(location => location.id === fl.locationId)),
    },
};

// // Example resolver functions (placeholders)
// function getUserById(id: string): User {
//     // Mock function to return user data by ID
//     return { id, firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Doctor', createdAt: new Date() };
// }

// function getUsersByLocation(state: string, zip: string): User[] {
//     // Mock function to return users by location criteria
//     return [{ id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', role: 'Doctor', createdAt: new Date() }];
// }

// function createUser(input: CreateUserInput): User {
//     // Mock function to create a new user and return the created user data
//     const { firstName, lastName, email, role } = input;
//     return { id: '1', firstName, lastName, email, role, createdAt: new Date() };
// }

// function createFacility(input: CreateFacilityInput): Facility {
//     // Mock function to create a new facility and return the created facility data
//     const { name } = input;
//     return { id: '1', name, createdAt: new Date(), locations: [] };
// }