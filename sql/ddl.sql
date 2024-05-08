-- Create the Facility table
CREATE TABLE IF NOT EXISTS facility (
    facility_id SERIAL PRIMARY KEY,
    facility_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create the Roles table
CREATE TABLE IF NOT EXISTS "role" (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(100) NOT NULL
);

-- Create the User table
CREATE TABLE IF NOT EXISTS "user" (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    role_id INT REFERENCES "role"(role_id)  -- Foreign key reference to Roles table
);

-- Create the UserFacilities table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS user_facility (
    user_id INT REFERENCES "user"(user_id),
    facility_id INT REFERENCES facility(facility_id),
    PRIMARY KEY (user_id, facility_id)
);

-- Create the Locations table
CREATE TABLE IF NOT EXISTS facility_location (
    location_id SERIAL PRIMARY KEY,
    facility_id INT REFERENCES facility(facility_id),
    "state" VARCHAR(255) NOT NULL,
    zip VARCHAR(10) NOT NULL,
    "address" VARCHAR(255) NOT NULL
);

