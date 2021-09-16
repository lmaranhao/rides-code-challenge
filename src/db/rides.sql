CREATE TABLE "Rides" (
	"rideId"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"driverName"	TEXT NOT NULL,
	"driverVehicle"	TEXT NOT NULL,
	"created"	DATETIME default CURRENT_TIMESTAMP
);

INSERT INTO Rides (driverName, driverVehicle)
VALUES 
('Rafael Nadal', 'Aston Martin DBS'),
('Roger Federer', 'Mercedes AMG GLE 63 S'),
('Novak Djockovic', 'Bentley Continental GT'),
('Carl Lewis', 'Ford Mustang'),
('Magic Johnson', 'Tesla Model X'),
('Michael Jordan', 'Porsche 718 Boxster'),
('Crisiano Ronaldo', 'Lamborghini Diablo'),
('Usain Bolt', 'Ferrari 488 GTB'),
('Iron Man', 'Audi E-Tron GT');