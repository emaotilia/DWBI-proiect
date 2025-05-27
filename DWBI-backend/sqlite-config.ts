import sqlite3 from 'sqlite3';
import { getLogger } from './log';

const logger = getLogger('SQLite Config');

export class DatabaseManager {
  private static instance: DatabaseManager;
  private db: sqlite3.Database | null = null;

  private constructor() {}

  static getInstance(): DatabaseManager {
    if (!DatabaseManager.instance) {
      DatabaseManager.instance = new DatabaseManager();
    }
    return DatabaseManager.instance;
  }

  async initDatabase(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database('./zoo_management.db', (err) => {
        if (err) {
          logger.error('Failed to connect to SQLite database:', err);
          reject(err);
        } else {
          logger.info('Connected to SQLite database successfully');
          this.createTables().then(resolve).catch(reject);
        }
      });
    });
  }

  private async createTables(): Promise<void> {
    const tables = [
      `CREATE TABLE IF NOT EXISTS zoo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nume TEXT NOT NULL,
        locatie TEXT NOT NULL,
        data_deschidere DATE,
        suprafata REAL,
        nr_angajati INTEGER
      )`,
      
      `CREATE TABLE IF NOT EXISTS angajat (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nume TEXT NOT NULL,
        prenume TEXT NOT NULL,
        functie TEXT NOT NULL,
        salariu REAL,
        data_angajare DATE,
        zoo_id INTEGER,
        FOREIGN KEY (zoo_id) REFERENCES zoo (id)
      )`,
      
      `CREATE TABLE IF NOT EXISTS animal (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nume TEXT NOT NULL,
        specie TEXT NOT NULL,
        varsta INTEGER,
        greutate REAL,
        data_sosire DATE,
        zoo_id INTEGER,
        FOREIGN KEY (zoo_id) REFERENCES zoo (id)
      )`,
      
      `CREATE TABLE IF NOT EXISTS vizitator (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nume TEXT NOT NULL,
        prenume TEXT NOT NULL,
        varsta INTEGER,
        email TEXT,
        telefon TEXT
      )`,
      
      `CREATE TABLE IF NOT EXISTS vizita (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data_vizita DATE NOT NULL,
        pret_bilet REAL,
        vizitator_id INTEGER,
        zoo_id INTEGER,
        FOREIGN KEY (vizitator_id) REFERENCES vizitator (id),
        FOREIGN KEY (zoo_id) REFERENCES zoo (id)
      )`,

      // Additional tables for complete zoo management system
      `CREATE TABLE IF NOT EXISTS eveniment (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        denumire_eveniment TEXT NOT NULL,
        descriere TEXT,
        data TEXT,
        durata INTEGER,
        capacitateMaxima INTEGER,
        zoo_id INTEGER,
        FOREIGN KEY (zoo_id) REFERENCES zoo (id)
      )`,

      `CREATE TABLE IF NOT EXISTS tip_bilet (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nume TEXT NOT NULL,
        pret REAL,
        descriere TEXT,
        discount REAL
      )`,

      `CREATE TABLE IF NOT EXISTS bilet (
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
      )`,

      `CREATE TABLE IF NOT EXISTS planificare_eveniment (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        evenimentId INTEGER,
        angajatId INTEGER,
        rol TEXT,
        dataAtribuirii TEXT,
        FOREIGN KEY (evenimentId) REFERENCES eveniment (id),
        FOREIGN KEY (angajatId) REFERENCES angajat (id)
      )`,

      `CREATE TABLE IF NOT EXISTS tarc (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nume TEXT,
        suprafata REAL,
        tipHabitat TEXT,
        capacitateMaxima INTEGER,
        zoo_id INTEGER,
        FOREIGN KEY (zoo_id) REFERENCES zoo (id)
      )`,

      `CREATE TABLE IF NOT EXISTS specie (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nume TEXT NOT NULL,
        numeComun TEXT,
        familia TEXT,
        ordinul TEXT,
        clasa TEXT,
        statusConservare TEXT
      )`,

      `CREATE TABLE IF NOT EXISTS studiu (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nume TEXT NOT NULL,
        institutie TEXT,
        anAbsolvire INTEGER,
        tipStudiu TEXT
      )`,

      `CREATE TABLE IF NOT EXISTS calificare (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        angajatId INTEGER,
        studiuId INTEGER,
        dataObtinerii TEXT,
        nota REAL,
        FOREIGN KEY (angajatId) REFERENCES angajat (id),
        FOREIGN KEY (studiuId) REFERENCES studiu (id)
      )`,

      `CREATE TABLE IF NOT EXISTS mancare (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nume TEXT NOT NULL,
        tipMancare TEXT,
        calorii INTEGER,
        pretPerKg REAL,
        furnizor TEXT
      )`,

      `CREATE TABLE IF NOT EXISTS se_hraneste_cu (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        animalId INTEGER,
        mancareId INTEGER,
        cantitateZilnica REAL,
        oraHranirii TEXT,
        FOREIGN KEY (animalId) REFERENCES animal (id),
        FOREIGN KEY (mancareId) REFERENCES mancare (id)
      )`
    ];

    for (const tableSQL of tables) {
      await this.runQuery(tableSQL);
    }

    // Insert sample data if tables are empty
    await this.insertSampleData();
  }

  private async insertSampleData(): Promise<void> {
    // Check if data already exists
    const zooCount = await this.getQuery('SELECT COUNT(*) as count FROM zoo');
    if (zooCount && zooCount.count === 0) {
      const sampleData = [
        // Zoos
        `INSERT INTO zoo (nume, locatie, data_deschidere, suprafata, nr_angajati) VALUES 
         ('Zoo Bucuresti', 'Bucuresti, Romania', '1955-08-15', 5.7, 150),
         ('Zoo Cluj', 'Cluj-Napoca, Romania', '1963-05-20', 3.2, 80),
         ('Zoo Constanta', 'Constanta, Romania', '1958-06-10', 4.1, 95)`,
        
        // Angajati
        `INSERT INTO angajat (nume, prenume, functie, salariu, data_angajare, zoo_id) VALUES 
         ('Popescu', 'Ion', 'Director', 8500.00, '2010-03-15', 1),
         ('Ionescu', 'Maria', 'Veterinar', 6200.00, '2015-07-22', 1),
         ('Georgescu', 'Alex', 'Ingrijitor', 3200.00, '2018-09-10', 1),
         ('Dumitrescu', 'Ana', 'Director', 8000.00, '2012-01-08', 2),
         ('Marinescu', 'Paul', 'Veterinar', 5800.00, '2016-11-15', 2)`,
        
        // Animals
        `INSERT INTO animal (nume, specie, varsta, greutate, data_sosire, zoo_id) VALUES 
         ('Leo', 'Leu african', 8, 190.5, '2018-04-12', 1),
         ('Maya', 'Elefant african', 15, 4200.0, '2015-08-20', 1),
         ('Koko', 'Gorila', 12, 180.0, '2017-06-05', 1),
         ('Bella', 'Tigru siberian', 6, 165.0, '2019-03-18', 2),
         ('Charlie', 'Urs brun', 10, 320.0, '2016-09-12', 2)`,
        
        // Vizitatori
        `INSERT INTO vizitator (nume, prenume, varsta, email, telefon) VALUES 
         ('Andrei', 'Mihai', 28, 'andrei.mihai@email.com', '0721234567'),
         ('Elena', 'Cristina', 34, 'elena.cristina@email.com', '0731234568'),
         ('Gabriel', 'Stefan', 22, 'gabriel.stefan@email.com', '0741234569'),
         ('Ioana', 'Alexandra', 29, 'ioana.alexandra@email.com', '0751234570'),
         ('Radu', 'Bogdan', 31, 'radu.bogdan@email.com', '0761234571')`,
        
        // Vizite
        `INSERT INTO vizita (data_vizita, pret_bilet, vizitator_id, zoo_id) VALUES 
         ('2024-01-15', 25.00, 1, 1),
         ('2024-01-20', 20.00, 2, 2),
         ('2024-02-05', 25.00, 3, 1),
         ('2024-02-12', 30.00, 4, 3),
         ('2024-02-18', 20.00, 5, 2)`
      ];

      for (const sql of sampleData) {
        await this.runQuery(sql);
      }
      
      logger.info('Sample data inserted successfully');
    }
  }

  async runQuery(sql: string, params: any[] = []): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }
      
      this.db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async getQuery(sql: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }
      
      this.db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  async getAllQuery(sql: string, params: any[] = []): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not initialized'));
        return;
      }
      
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows || []);
        }
      });
    });
  }

  async closeDatabase(): Promise<void> {
    return new Promise((resolve) => {
      if (this.db) {
        this.db.close(() => {
          logger.info('SQLite database connection closed');
          resolve();
        });
      } else {
        resolve();
      }
    });
  }
}

export default DatabaseManager;
