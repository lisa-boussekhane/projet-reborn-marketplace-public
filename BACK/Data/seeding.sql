BEGIN;

INSERT INTO "user" ("first_name", "last_name", "username", "email", "password", "date_of_birth", "phone", "address", "zip_code", "city", "state", "role", "duns" ) VALUES
('Gabriela', 'Fernandez', 'GFernandez', 'gabriela.fernandez@gmail.com', 'reborn', '1986-12-21', '5555551234', '20 W 34th St.', ' 10001', 'New York', 'New York', 'Seller', '150483782'),
('Cynthia', 'Smith', 'cynthiasmith87', 'cynthia.smith@yahoo.com', 'reborn', '1987-12-05', '5555555678', '2760 Fifth Avenue', '92103', 'San Diego', 'California', 'Buyer', NULL),
('Mary', 'Doe', 'marydoe', 'mary.doe@outlook.com', 'reborn', '1976-02-10', '5556575678', '1112 Northside Dr NW', '30318', 'Atlanta', 'Georgia', 'Seller/Buyer', NULL);

COMMIT;
