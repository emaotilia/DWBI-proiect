-- Create missing tables

-- TABEL EVENIMENT
CREATE TABLE IF NOT EXISTS eveniment (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  denumire_eveniment TEXT NOT NULL,
  descriere TEXT,
  data TEXT,
  durata INTEGER,
  capacitateMaxima INTEGER,
  zoo_id INTEGER,
  FOREIGN KEY (zoo_id) REFERENCES zoo (id)
);

-- TABEL TIP_BILET
CREATE TABLE IF NOT EXISTS tip_bilet (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nume TEXT NOT NULL,
  pret REAL,
  descriere TEXT,
  discount REAL
);

-- TABEL BILET
CREATE TABLE IF NOT EXISTS bilet (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  numarBilet TEXT,
  dataVanzarii TEXT NOT NULL,
  evenimentId INTEGER,
  vizitatorId INTEGER,
  tipBiletId INTEGER,
  pretFinal REAL,
  FOREIGN KEY (evenimentId) REFERENCES eveniment (id),
  FOREIGN KEY (vizitatorId) REFERENCES vizitator (id),
  FOREIGN KEY (tipBiletId) REFERENCES tip_bilet (id)
);

-- TABEL PLANIFICARE_EVENIMENT
CREATE TABLE IF NOT EXISTS planificare_eveniment (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  evenimentId INTEGER,
  angajatId INTEGER,
  rol TEXT,
  dataAtribuirii TEXT,
  FOREIGN KEY (evenimentId) REFERENCES eveniment (id),
  FOREIGN KEY (angajatId) REFERENCES angajat (id)
);

-- TABEL TARC
CREATE TABLE IF NOT EXISTS tarc (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nume TEXT,
  suprafata REAL,
  tipHabitat TEXT,
  capacitateMaxima INTEGER,
  zoo_id INTEGER,
  FOREIGN KEY (zoo_id) REFERENCES zoo (id)
);

-- TABEL SPECIE
CREATE TABLE IF NOT EXISTS specie (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nume TEXT NOT NULL,
  numeComun TEXT,
  familia TEXT,
  ordinul TEXT,
  clasa TEXT,
  statusConservare TEXT
);

-- TABEL STUDIU
CREATE TABLE IF NOT EXISTS studiu (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nume TEXT NOT NULL,
  institutie TEXT,
  anAbsolvire INTEGER,
  tipStudiu TEXT
);

-- TABEL CALIFICARE
CREATE TABLE IF NOT EXISTS calificare (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  angajatId INTEGER,
  studiuId INTEGER,
  dataObtinerii TEXT,
  nota REAL,
  FOREIGN KEY (angajatId) REFERENCES angajat (id),
  FOREIGN KEY (studiuId) REFERENCES studiu (id)
);

-- TABEL MANCARE
CREATE TABLE IF NOT EXISTS mancare (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nume TEXT NOT NULL,
  tipMancare TEXT,
  calorii INTEGER,
  pretPerKg REAL,
  furnizor TEXT
);

-- TABEL SE_HRANESTE_CU
CREATE TABLE IF NOT EXISTS se_hraneste_cu (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  animalId INTEGER,
  mancareId INTEGER,
  cantitateZilnica REAL,
  oraHranirii TEXT,
  FOREIGN KEY (animalId) REFERENCES animal (id),
  FOREIGN KEY (mancareId) REFERENCES mancare (id)
);

-- Sample data for ZOO
INSERT OR IGNORE INTO zoo (id, nume, locatie) VALUES (1, 'Gradina Zoologica din Bucuresti', 'Bucuresti');
INSERT OR IGNORE INTO zoo (id, nume, locatie) VALUES (2, 'Gradina Zoologica din Timisoara', 'Timisoara');
INSERT OR IGNORE INTO zoo (id, nume, locatie) VALUES (3, 'Gradina Zoologica din Oradea', 'Oradea');
INSERT OR IGNORE INTO zoo (id, nume, locatie) VALUES (4, 'Gradina Zoologica din Resita', 'Resita');
INSERT OR IGNORE INTO zoo (id, nume, locatie) VALUES (5, 'Gradina Zoologica din Targu Mures', 'Targu Mures');
INSERT OR IGNORE INTO zoo (id, nume, locatie) VALUES (6, 'Gradina Zoologica din Constanta', 'Constanta');
INSERT OR IGNORE INTO zoo (id, nume, locatie) VALUES (7, 'Gradina Zoologica din Iasi', 'Iasi');
INSERT OR IGNORE INTO zoo (id, nume, locatie) VALUES (8, 'Gradina Zoologica din Brasov', 'Brasov');
INSERT OR IGNORE INTO zoo (id, nume, locatie) VALUES (9, 'Gradina Zoologica din Braila', 'Braila');
INSERT OR IGNORE INTO zoo (id, nume, locatie) VALUES (10, 'Gradina Zoologica din Arad', 'Arad');
INSERT OR IGNORE INTO zoo (id, nume, locatie) VALUES (11, 'Gradina Zoologica din Cluj-Napoca', 'Cluj-Napoca');
INSERT OR IGNORE INTO zoo (id, nume, locatie) VALUES (12, 'Gradina Zoologica din Sibiu', 'Sibiu');
INSERT OR IGNORE INTO zoo (id, nume, locatie) VALUES (13, 'Gradina Zoologica din Craiova', 'Craiova');
INSERT OR IGNORE INTO zoo (id, nume, locatie) VALUES (14, 'Gradina Zoologica din Galati', 'Galati');
INSERT OR IGNORE INTO zoo (id, nume, locatie) VALUES (15, 'Gradina Zoologica din Pitesti', 'Pitesti');

-- Sample data for ANGAJAT
INSERT OR IGNORE INTO angajat (id, zoo_id, nume, prenume, functie, salariu, data_angajare) 
VALUES (1, 1, 'Dobre', 'Elena', 'gestionare buget', 3400, '2022-01-10');
INSERT OR IGNORE INTO angajat (id, zoo_id, nume, prenume, functie, salariu, data_angajare) 
VALUES (2, 2, 'Fratila', 'Mihai', 'hranire animale', 4200, '2022-02-15');
INSERT OR IGNORE INTO angajat (id, zoo_id, nume, prenume, functie, salariu, data_angajare) 
VALUES (3, 3, 'Voinea', 'Teodor', 'time management', 5100, '2021-05-20');
INSERT OR IGNORE INTO angajat (id, zoo_id, nume, prenume, functie, salariu, data_angajare) 
VALUES (4, 4, 'Iancu', 'Marcel', 'manipulare bilete', 4000, '2022-03-01');
INSERT OR IGNORE INTO angajat (id, zoo_id, nume, prenume, functie, salariu, data_angajare) 
VALUES (5, 5, 'Dumitrescu', 'Valentina', 'tratare animale', 5500, '2021-11-12');

-- Sample data for VIZITATOR
INSERT OR IGNORE INTO vizitator (id, nume, prenume, varsta, email, telefon)
VALUES (1, 'Popa', 'Maria', 35, 'popa.maria@email.com', '0722123456');
INSERT OR IGNORE INTO vizitator (id, nume, prenume, varsta, email, telefon)
VALUES (2, 'Ionescu', 'Ion', 65, 'ionescu.ion@email.com', '0733234567');
INSERT OR IGNORE INTO vizitator (id, nume, prenume, varsta, email, telefon)
VALUES (3, 'Dumitrescu', 'Andrei', 42, 'dumitrescu.andrei@email.com', '0744345678');
INSERT OR IGNORE INTO vizitator (id, nume, prenume, varsta, email, telefon)
VALUES (4, 'Stanciu', 'Elena', 70, 'stanciu.elena@email.com', '0755456789');
INSERT OR IGNORE INTO vizitator (id, nume, prenume, varsta, email, telefon)
VALUES (5, 'Radulescu', 'Mihai', 38, 'radulescu.mihai@email.com', '0766567890');

-- Sample data for EVENIMENT
INSERT OR IGNORE INTO eveniment (id, denumire_eveniment, descriere, data, durata, capacitateMaxima, zoo_id)
VALUES (1, 'Noaptea Animalelor', 'Vizitare nocturnă a grădinii zoologice', '2023-07-15', 180, 100, 1);
INSERT OR IGNORE INTO eveniment (id, denumire_eveniment, descriere, data, durata, capacitateMaxima, zoo_id)
VALUES (2, 'City Break de Primavara', 'Activități educative cu copiii', '2023-04-22', 240, 50, 2);
INSERT OR IGNORE INTO eveniment (id, denumire_eveniment, descriere, data, durata, capacitateMaxima, zoo_id)
VALUES (3, 'Craciun Pufos', 'Sărbători alături de animale', '2023-12-24', 120, 80, 3);
INSERT OR IGNORE INTO eveniment (id, denumire_eveniment, descriere, data, durata, capacitateMaxima, zoo_id)
VALUES (4, 'Seara fluturilor', 'Vizitarea insectarului de fluturi', '2023-06-10', 90, 30, 4);
INSERT OR IGNORE INTO eveniment (id, denumire_eveniment, descriere, data, durata, capacitateMaxima, zoo_id)
VALUES (5, 'Petting Zoo', 'Interacțiune cu animale domestice', '2023-08-05', 180, 60, 5);

-- Sample data for TIP_BILET
INSERT OR IGNORE INTO tip_bilet (id, nume, pret, descriere, discount)
VALUES (1, 'Bilet adult', 50.00, 'Bilet standard pentru adulți', 0.00);
INSERT OR IGNORE INTO tip_bilet (id, nume, pret, descriere, discount)
VALUES (2, 'Bilet elev/student', 25.00, 'Bilet cu reducere pentru elevi și studenți', 0.50);
INSERT OR IGNORE INTO tip_bilet (id, nume, pret, descriere, discount)
VALUES (3, 'Bilet pensionar', 30.00, 'Bilet cu reducere pentru pensionari', 0.40);
INSERT OR IGNORE INTO tip_bilet (id, nume, pret, descriere, discount)
VALUES (4, 'Bilet promoțional', 35.00, 'Bilet cu reducere pentru promoții speciale', 0.30);
INSERT OR IGNORE INTO tip_bilet (id, nume, pret, descriere, discount)
VALUES (5, 'Bilet special', 40.00, 'Bilet pentru cazuri speciale', 0.20);

-- Sample data for animal
INSERT OR IGNORE INTO animal (id, nume, specie, varsta, greutate, data_sosire, zoo_id)
VALUES (1, 'Leo', 'Leu african', 5, 190.5, '2019-03-15', 1);
INSERT OR IGNORE INTO animal (id, nume, specie, varsta, greutate, data_sosire, zoo_id)
VALUES (2, 'Melman', 'Girafa', 7, 800.0, '2018-06-22', 2);
INSERT OR IGNORE INTO animal (id, nume, specie, varsta, greutate, data_sosire, zoo_id)
VALUES (3, 'Gloria', 'Hipopotam', 6, 1400.5, '2020-01-10', 3);
INSERT OR IGNORE INTO animal (id, nume, specie, varsta, greutate, data_sosire, zoo_id)
VALUES (4, 'Marty', 'Zebra', 4, 350.2, '2021-04-05', 1);
INSERT OR IGNORE INTO animal (id, nume, specie, varsta, greutate, data_sosire, zoo_id)
VALUES (5, 'Alex', 'Tigru siberian', 8, 215.7, '2017-11-30', 2);
