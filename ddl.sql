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

-- Insert predefined roles (Doctor and Administrator) into Roles table
INSERT INTO "Roles" (role_name) VALUES
    ('Doctor'),
    ('Administrator');

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

-- Populate sample data for demonstration
INSERT INTO "Facility" (facility_name) VALUES
    ('Hospital A'),
    ('Clinic B');

INSERT INTO "User" (username, email, role_id) VALUES
    ('john_doe', 'john@example.com', 1),  -- Doctor role
    ('jane_smith', 'jane@example.com', 2); -- Administrator role

INSERT INTO "UserFacilities" (user_id, facility_id)  VALUES
    (1, 1), -- John Doe is associated with Hospital A
    (2, 2) -- Jane Smith is associated with Clinic B
    ON CONFLICT (user_id, facility_id) DO NOTHING; 

INSERT INTO "Locations" (facility_id, location_name) VALUES
    (1, 'Main Building'),   -- Hospital A's main building
    (1, 'Annex Building'),  -- Hospital A's annex building
    (2, 'Downtown Clinic'); -- Clinic B's downtown location