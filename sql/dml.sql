-- Insert predefined roles (Doctor and Administrator) into Roles table
INSERT INTO "role" (role_name) VALUES
    ('Doctor'),
    ('Administrator');

-- Populate sample data for demonstration
INSERT INTO facility (facility_name) VALUES
    ('Hospital Cure All'),
    ('Clinic Uergent Care');

INSERT INTO "user" (username, email, role_id) VALUES
    ('john_doe', 'john@example.com', 1),  -- Doctor role
    ('jane_smith', 'jane@example.com', 2); -- Administrator role

INSERT INTO user_facility (user_id, facility_id)  VALUES
    (1, 1), -- John Doe is associated with Hospital A
    (2, 2) -- Jane Smith is associated with Clinic B
    ON CONFLICT (user_id, facility_id) DO NOTHING; 

INSERT INTO facility_location (facility_id, "address", "state", zip) VALUES
    (1, 'Main Building', 'NY', '10001'),   -- Hospital A's main building
    (1, 'Annex Building', 'NY', '10001'),  -- Hospital A's annex building
    (2, 'Downtown Clinic', 'NJ', '12345'); -- Clinic B's downtown location