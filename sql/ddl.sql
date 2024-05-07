-- Create the Facility table
CREATE TABLE IF NOT EXISTS "Facility" (
    facility_id SERIAL PRIMARY KEY,
    facility_name VARCHAR(255) NOT NULL
);

-- Create the Roles table
CREATE TABLE IF NOT EXISTS "Roles" (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(100) NOT NULL
);

-- Create the User table
CREATE TABLE IF NOT EXISTS "User" (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role_id INT REFERENCES "Roles"(role_id)  -- Foreign key reference to Roles table
);

-- Create the UserFacilities table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS "UserFacilities" (
    user_id INT REFERENCES "User"(user_id),
    facility_id INT REFERENCES "Facility"(facility_id),
    PRIMARY KEY (user_id, facility_id)
);

-- Create the Locations table
CREATE TABLE IF NOT EXISTS "Locations" (
    location_id SERIAL PRIMARY KEY,
    facility_id INT REFERENCES "Facility"(facility_id),
    location_name VARCHAR(255) NOT NULL
);

