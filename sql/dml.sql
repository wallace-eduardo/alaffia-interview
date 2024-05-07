-- Insert predefined roles (Doctor and Administrator) into Roles table
INSERT INTO "Roles" (role_name) VALUES
    ('Doctor'),
    ('Administrator');

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