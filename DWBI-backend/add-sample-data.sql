-- Add sample data for reporting and analytics

-- Insert sample tip_bilet data
INSERT OR IGNORE INTO tip_bilet (nume, pret, descriere, discount) VALUES 
('Adult Standard', 25.00, 'Bilet adult pentru vizita standard', 0),
('Copil', 15.00, 'Bilet pentru copii sub 12 ani', 40),
('Student', 20.00, 'Bilet cu reducere pentru studenți', 20),
('Senior', 20.00, 'Bilet pentru persoane peste 65 ani', 20),
('Familie', 80.00, 'Bilet familie (2 adulți + 2 copii)', 25);

-- Insert sample evenimente data
INSERT OR IGNORE INTO eveniment (denumire_eveniment, descriere, data, durata, capacitateMaxima, zoo_id) VALUES 
('Hrănirea Leilor', 'Spectacol de hrănire a leilor cu explicații educaționale', '2024-01-15 15:00:00', 45, 100, 1),
('Plimbarea cu Elefanții', 'Experiență interactivă cu elefanții', '2024-01-16 14:00:00', 60, 50, 1),
('Lecție despre Conservare', 'Program educațional despre conservarea speciilor', '2024-01-20 10:00:00', 90, 80, 2),
('Noaptea la Zoo', 'Eveniment special de seară pentru familii', '2024-02-01 18:00:00', 180, 200, 1),
('Workshop Foto Wildlife', 'Atelier de fotografie cu animale sălbatice', '2024-02-05 09:00:00', 120, 30, 2),
('Ziua Pinguinilor', 'Celebrarea Zilei Mondiale a Pinguinilor', '2024-02-10 11:00:00', 60, 150, 3),
('Spectacol cu Păsări', 'Demonstrație de zbor cu păsări de pradă', '2024-02-15 16:00:00', 30, 120, 1),
('Atelier pentru Copii', 'Activități educaționale pentru copii', '2024-02-20 10:00:00', 90, 60, 2);

-- Insert sample bilet data (tickets sold for events)
INSERT OR IGNORE INTO bilet (numarBilet, dataVanzarii, evenimentId, vizitatorId, tipBiletId, pretFinal) VALUES 
('BT001', '2024-01-10 10:30:00', 1, 1, 1, 25.00),
('BT002', '2024-01-12 14:20:00', 1, 2, 2, 15.00),
('BT003', '2024-01-13 09:15:00', 2, 3, 1, 25.00),
('BT004', '2024-01-14 16:45:00', 2, 4, 3, 20.00),
('BT005', '2024-01-15 11:30:00', 3, 5, 1, 25.00),
('BT006', '2024-01-18 13:20:00', 4, 1, 5, 80.00),
('BT007', '2024-01-20 10:10:00', 4, 2, 1, 25.00),
('BT008', '2024-01-22 15:30:00', 5, 3, 3, 20.00),
('BT009', '2024-01-25 12:45:00', 5, 4, 1, 25.00),
('BT010', '2024-01-28 14:15:00', 6, 5, 2, 15.00),
('BT011', '2024-02-01 09:30:00', 7, 1, 1, 25.00),
('BT012', '2024-02-03 16:20:00', 7, 2, 4, 20.00),
('BT013', '2024-02-05 11:45:00', 8, 3, 5, 80.00),
('BT014', '2024-02-08 13:10:00', 8, 4, 1, 25.00),
('BT015', '2024-02-10 10:50:00', 1, 5, 2, 15.00),
('BT016', '2024-02-12 15:25:00', 2, 1, 3, 20.00),
('BT017', '2024-02-15 12:30:00', 3, 2, 1, 25.00),
('BT018', '2024-02-18 14:40:00', 4, 3, 4, 20.00),
('BT019', '2024-02-20 11:15:00', 5, 4, 5, 80.00),
('BT020', '2024-02-22 16:05:00', 6, 5, 1, 25.00);

-- Insert additional vizita data for better analytics
INSERT OR IGNORE INTO vizita (data_vizita, pret_bilet, vizitator_id, zoo_id) VALUES 
('2024-01-05', 25.00, 1, 1),
('2024-01-08', 15.00, 2, 1),
('2024-01-12', 25.00, 3, 2),
('2024-01-15', 20.00, 4, 2),
('2024-01-18', 25.00, 5, 3),
('2024-01-22', 80.00, 1, 1),
('2024-01-25', 15.00, 2, 2),
('2024-01-28', 25.00, 3, 3),
('2024-02-01', 20.00, 4, 1),
('2024-02-05', 25.00, 5, 2),
('2024-02-08', 15.00, 1, 3),
('2024-02-12', 25.00, 2, 1),
('2024-02-15', 80.00, 3, 2),
('2024-02-18', 20.00, 4, 3),
('2024-02-22', 25.00, 5, 1);

-- Insert planificare_eveniment data (event planning)
INSERT OR IGNORE INTO planificare_eveniment (evenimentId, angajatId, rol, dataAtribuirii) VALUES 
(1, 1, 'Coordonator Principal', '2024-01-01'),
(1, 2, 'Specialist Veterinar', '2024-01-01'),
(2, 1, 'Coordonator Principal', '2024-01-02'),
(2, 3, 'Ghid Turistic', '2024-01-02'),
(3, 4, 'Coordonator Principal', '2024-01-05'),
(3, 5, 'Specialist Educațional', '2024-01-05'),
(4, 1, 'Manager Eveniment', '2024-01-10'),
(4, 2, 'Specialist Veterinar', '2024-01-10'),
(4, 3, 'Ghid Turistic', '2024-01-10'),
(5, 4, 'Instructor Foto', '2024-01-15'),
(6, 1, 'Coordonator Principal', '2024-01-20'),
(7, 2, 'Specialist Păsări', '2024-01-25'),
(8, 5, 'Educator Copii', '2024-02-01'); 