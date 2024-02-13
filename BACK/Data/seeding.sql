BEGIN;

INSERT INTO "user" ("id", "first_name", "last_name", "username", "email", "password", "date_of_birth", "phone", "address", "zip_code", "city", "state", "role", "duns" ) VALUES
(1, 'Gabriela', 'Fernandez', 'GFernandez', 'gabriela.fernandez@gmail.com', 'reborn', '12/21/1986', '555 555 1234', '20 W 34th St.', ' 10001', 'New York', 'New York', 'Seller', '150483782'),
(2, 'Cynthia', 'Smith', 'cynthiasmith87', 'cynthia.smith@yahoo.com', 'reborn', '05/12/1987', '555 555 5678', '2760 Fifth Avenue', '92103', 'San Diego', 'California', 'Buyer'),
(3, 'Mary', 'Doe', 'marydoe', 'mary.doe@outlook.com', 'reborn', '10/02/1976', '555 657 5678', '1112 Northside Dr NW', '30318', 'Atlanta', 'Georgia', 'Buyer/Seller'),

COMMIT;
