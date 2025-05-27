import Router from "koa-router";
import DatabaseManager from "./sqlite-config";

export class PublicRouter extends Router {
  private db: DatabaseManager;

  constructor(args: any) {
    super(args);
    this.db = DatabaseManager.getInstance();

    // GET all records endpoints
    this.get('/vizitator', async (ctx: any) => {
      try {
        const result = await this.db.getAllQuery(`SELECT * FROM vizitator`);
        ctx.body = result;
      } catch (error) {
        console.log('Database error for /vizitator:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    this.get('/zoo', async (ctx: any) => {
      try {
        const result = await this.db.getAllQuery(`SELECT * FROM zoo`);
        ctx.body = result;
      } catch (error) {
        console.log('Database error for /zoo:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    this.get('/angajat', async (ctx: any) => {
      try {
        const result = await this.db.getAllQuery(`SELECT * FROM angajat`);
        ctx.body = result;
      } catch (error) {
        console.log('Database error for /angajat:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    this.get('/animal', async (ctx: any) => {
      try {
        const result = await this.db.getAllQuery(`SELECT * FROM animal`);
        ctx.body = result;
      } catch (error) {
        console.log('Database error for /animal:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    this.get('/vizita', async (ctx: any) => {
      try {
        const result = await this.db.getAllQuery(`SELECT * FROM vizita`);
        ctx.body = result;
      } catch (error) {
        console.log('Database error for /vizita:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    // Additional GET endpoints for new tables
    this.get('/eveniment', async (ctx: any) => {
      try {
        const result = await this.db.getAllQuery(`SELECT * FROM eveniment`);
        ctx.body = result;
      } catch (error) {
        console.log('Database error for /eveniment:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    this.get('/tip_bilet', async (ctx: any) => {
      try {
        const result = await this.db.getAllQuery(`SELECT * FROM tip_bilet`);
        ctx.body = result;
      } catch (error) {
        console.log('Database error for /tip_bilet:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    this.get('/bilet', async (ctx: any) => {
      try {
        const result = await this.db.getAllQuery(`SELECT * FROM bilet`);
        ctx.body = result;
      } catch (error) {
        console.log('Database error for /bilet:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    this.get('/planificare_eveniment', async (ctx: any) => {
      try {
        const result = await this.db.getAllQuery(`SELECT * FROM planificare_eveniment`);
        ctx.body = result;
      } catch (error) {
        console.log('Database error for /planificare_eveniment:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    this.get('/tarc', async (ctx: any) => {
      try {
        const result = await this.db.getAllQuery(`SELECT * FROM tarc`);
        ctx.body = result;
      } catch (error) {
        console.log('Database error for /tarc:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    this.get('/specie', async (ctx: any) => {
      try {
        const result = await this.db.getAllQuery(`SELECT * FROM specie`);
        ctx.body = result;
      } catch (error) {
        console.log('Database error for /specie:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    this.get('/studiu', async (ctx: any) => {
      try {
        const result = await this.db.getAllQuery(`SELECT * FROM studiu`);
        ctx.body = result;
      } catch (error) {
        console.log('Database error for /studiu:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    this.get('/calificare', async (ctx: any) => {
      try {
        const result = await this.db.getAllQuery(`SELECT * FROM calificare`);
        ctx.body = result;
      } catch (error) {
        console.log('Database error for /calificare:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    this.get('/mancare', async (ctx: any) => {
      try {
        const result = await this.db.getAllQuery(`SELECT * FROM mancare`);
        ctx.body = result;
      } catch (error) {
        console.log('Database error for /mancare:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    this.get('/se_hraneste_cu', async (ctx: any) => {
      try {
        const result = await this.db.getAllQuery(`SELECT * FROM se_hraneste_cu`);
        ctx.body = result;
      } catch (error) {
        console.log('Database error for /se_hraneste_cu:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    // POST endpoints pentru CRUD operations
    this.post('/vizitator', async (ctx: any) => {
      try {
        const { nume, prenume, varsta, email, telefon } = ctx.request.body;
        await this.db.runQuery(
          'INSERT INTO vizitator (nume, prenume, varsta, email, telefon) VALUES (?, ?, ?, ?, ?)',
          [nume, prenume, varsta, email, telefon]
        );
        ctx.status = 201;
        ctx.body = { message: 'Vizitator created successfully' };
      } catch (error) {
        console.log('Error creating vizitator:', error);
        ctx.status = 500;
        ctx.body = { error: 'Failed to create vizitator' };
      }
    });

    this.post('/zoo', async (ctx: any) => {
      try {
        const { nume, locatie, data_deschidere, suprafata, nr_angajati } = ctx.request.body;
        await this.db.runQuery(
          'INSERT INTO zoo (nume, locatie, data_deschidere, suprafata, nr_angajati) VALUES (?, ?, ?, ?, ?)',
          [nume, locatie, data_deschidere, suprafata, nr_angajati]
        );
        ctx.status = 201;
        ctx.body = { message: 'Zoo created successfully' };
      } catch (error) {
        console.log('Error creating zoo:', error);
        ctx.status = 500;
        ctx.body = { error: 'Failed to create zoo' };
      }
    });

    this.post('/angajat', async (ctx: any) => {
      try {
        const { nume, prenume, functie, salariu, data_angajare, zoo_id } = ctx.request.body;
        await this.db.runQuery(
          'INSERT INTO angajat (nume, prenume, functie, salariu, data_angajare, zoo_id) VALUES (?, ?, ?, ?, ?, ?)',
          [nume, prenume, functie, salariu, data_angajare, zoo_id]
        );
        ctx.status = 201;
        ctx.body = { message: 'Angajat created successfully' };
      } catch (error) {
        console.log('Error creating angajat:', error);
        ctx.status = 500;
        ctx.body = { error: 'Failed to create angajat' };
      }
    });

    this.post('/animal', async (ctx: any) => {
      try {
        const { nume, specie, varsta, greutate, data_sosire, zoo_id } = ctx.request.body;
        await this.db.runQuery(
          'INSERT INTO animal (nume, specie, varsta, greutate, data_sosire, zoo_id) VALUES (?, ?, ?, ?, ?, ?)',
          [nume, specie, varsta, greutate, data_sosire, zoo_id]
        );
        ctx.status = 201;
        ctx.body = { message: 'Animal created successfully' };
      } catch (error) {
        console.log('Error creating animal:', error);
        ctx.status = 500;
        ctx.body = { error: 'Failed to create animal' };
      }
    });

    this.post('/vizita', async (ctx: any) => {
      try {
        const { data_vizita, pret_bilet, vizitator_id, zoo_id } = ctx.request.body;
        await this.db.runQuery(
          'INSERT INTO vizita (data_vizita, pret_bilet, vizitator_id, zoo_id) VALUES (?, ?, ?, ?)',
          [data_vizita, pret_bilet, vizitator_id, zoo_id]
        );
        ctx.status = 201;
        ctx.body = { message: 'Vizita created successfully' };
      } catch (error) {
        console.log('Error creating vizita:', error);
        ctx.status = 500;
        ctx.body = { error: 'Failed to create vizita' };
      }
    });

    // Additional POST endpoints for new tables
    this.post('/eveniment', async (ctx: any) => {
      try {
        const { denumire_eveniment, descriere, data, durata, capacitateMaxima, zoo_id } = ctx.request.body;
        await this.db.runQuery(
          'INSERT INTO eveniment (denumire_eveniment, descriere, data, durata, capacitateMaxima, zoo_id) VALUES (?, ?, ?, ?, ?, ?)',
          [denumire_eveniment, descriere, data, durata, capacitateMaxima, zoo_id]
        );
        ctx.status = 201;
        ctx.body = { message: 'Eveniment created successfully' };
      } catch (error) {
        console.log('Error creating eveniment:', error);
        ctx.status = 500;
        ctx.body = { error: 'Failed to create eveniment' };
      }
    });

    this.post('/tip_bilet', async (ctx: any) => {
      try {
        const { nume, pret, descriere, discount } = ctx.request.body;
        await this.db.runQuery(
          'INSERT INTO tip_bilet (nume, pret, descriere, discount) VALUES (?, ?, ?, ?)',
          [nume, pret, descriere, discount]
        );
        ctx.status = 201;
        ctx.body = { message: 'Tip bilet created successfully' };
      } catch (error) {
        console.log('Error creating tip_bilet:', error);
        ctx.status = 500;
        ctx.body = { error: 'Failed to create tip_bilet' };
      }
    });

    this.post('/bilet', async (ctx: any) => {
      try {
        const { numarBilet, dataVanzarii, evenimentId, vizitatorId, tipBiletId, pretFinal } = ctx.request.body;
        await this.db.runQuery(
          'INSERT INTO bilet (numarBilet, dataVanzarii, evenimentId, vizitatorId, tipBiletId, pretFinal) VALUES (?, ?, ?, ?, ?, ?)',
          [numarBilet, dataVanzarii, evenimentId, vizitatorId, tipBiletId, pretFinal]
        );
        ctx.status = 201;
        ctx.body = { message: 'Bilet created successfully' };
      } catch (error) {
        console.log('Error creating bilet:', error);
        ctx.status = 500;
        ctx.body = { error: 'Failed to create bilet' };
      }
    });

    this.post('/planificare_eveniment', async (ctx: any) => {
      try {
        const { evenimentId, angajatId, rol, dataAtribuirii } = ctx.request.body;
        await this.db.runQuery(
          'INSERT INTO planificare_eveniment (evenimentId, angajatId, rol, dataAtribuirii) VALUES (?, ?, ?, ?)',
          [evenimentId, angajatId, rol, dataAtribuirii]
        );
        ctx.status = 201;
        ctx.body = { message: 'Planificare eveniment created successfully' };
      } catch (error) {
        console.log('Error creating planificare_eveniment:', error);
        ctx.status = 500;
        ctx.body = { error: 'Failed to create planificare_eveniment' };
      }
    });

    this.post('/tarc', async (ctx: any) => {
      try {
        const { nume, suprafata, tipHabitat, capacitateMaxima, zoo_id } = ctx.request.body;
        await this.db.runQuery(
          'INSERT INTO tarc (nume, suprafata, tipHabitat, capacitateMaxima, zoo_id) VALUES (?, ?, ?, ?, ?)',
          [nume, suprafata, tipHabitat, capacitateMaxima, zoo_id]
        );
        ctx.status = 201;
        ctx.body = { message: 'Tarc created successfully' };
      } catch (error) {
        console.log('Error creating tarc:', error);
        ctx.status = 500;
        ctx.body = { error: 'Failed to create tarc' };
      }
    });

    this.post('/specie', async (ctx: any) => {
      try {
        const { nume, numeComun, familia, ordinul, clasa, statusConservare } = ctx.request.body;
        await this.db.runQuery(
          'INSERT INTO specie (nume, numeComun, familia, ordinul, clasa, statusConservare) VALUES (?, ?, ?, ?, ?, ?)',
          [nume, numeComun, familia, ordinul, clasa, statusConservare]
        );
        ctx.status = 201;
        ctx.body = { message: 'Specie created successfully' };
      } catch (error) {
        console.log('Error creating specie:', error);
        ctx.status = 500;
        ctx.body = { error: 'Failed to create specie' };
      }
    });

    this.post('/studiu', async (ctx: any) => {
      try {
        const { nume, institutie, anAbsolvire, tipStudiu } = ctx.request.body;
        await this.db.runQuery(
          'INSERT INTO studiu (nume, institutie, anAbsolvire, tipStudiu) VALUES (?, ?, ?, ?)',
          [nume, institutie, anAbsolvire, tipStudiu]
        );
        ctx.status = 201;
        ctx.body = { message: 'Studiu created successfully' };
      } catch (error) {
        console.log('Error creating studiu:', error);
        ctx.status = 500;
        ctx.body = { error: 'Failed to create studiu' };
      }
    });

    this.post('/calificare', async (ctx: any) => {
      try {
        const { angajatId, studiuId, dataObtinerii, nota } = ctx.request.body;
        await this.db.runQuery(
          'INSERT INTO calificare (angajatId, studiuId, dataObtinerii, nota) VALUES (?, ?, ?, ?)',
          [angajatId, studiuId, dataObtinerii, nota]
        );
        ctx.status = 201;
        ctx.body = { message: 'Calificare created successfully' };
      } catch (error) {
        console.log('Error creating calificare:', error);
        ctx.status = 500;
        ctx.body = { error: 'Failed to create calificare' };
      }
    });

    this.post('/mancare', async (ctx: any) => {
      try {
        const { nume, tipMancare, calorii, pretPerKg, furnizor } = ctx.request.body;
        await this.db.runQuery(
          'INSERT INTO mancare (nume, tipMancare, calorii, pretPerKg, furnizor) VALUES (?, ?, ?, ?, ?)',
          [nume, tipMancare, calorii, pretPerKg, furnizor]
        );
        ctx.status = 201;
        ctx.body = { message: 'Mancare created successfully' };
      } catch (error) {
        console.log('Error creating mancare:', error);
        ctx.status = 500;
        ctx.body = { error: 'Failed to create mancare' };
      }
    });

    this.post('/se_hraneste_cu', async (ctx: any) => {
      try {
        const { animalId, mancareId, cantitateZilnica, oraHranirii } = ctx.request.body;
        await this.db.runQuery(
          'INSERT INTO se_hraneste_cu (animalId, mancareId, cantitateZilnica, oraHranirii) VALUES (?, ?, ?, ?)',
          [animalId, mancareId, cantitateZilnica, oraHranirii]
        );
        ctx.status = 201;
        ctx.body = { message: 'Se hraneste cu created successfully' };
      } catch (error) {
        console.log('Error creating se_hraneste_cu:', error);
        ctx.status = 500;
        ctx.body = { error: 'Failed to create se_hraneste_cu' };
      }
    });

    // PUT endpoints pentru update
    this.put('/vizitator/:id', async (ctx: any) => {
      try {
        const { id } = ctx.params;
        const { nume, prenume, varsta, email, telefon } = ctx.request.body;
        await this.db.runQuery(
          'UPDATE vizitator SET nume = ?, prenume = ?, varsta = ?, email = ?, telefon = ? WHERE id = ?',
          [nume, prenume, varsta, email, telefon, id]
        );
        ctx.body = { message: 'Vizitator updated successfully' };
      } catch (error) {
        console.log('Error updating vizitator:', error);
        ctx.status = 500;
        ctx.body = { error: 'Failed to update vizitator' };
      }
    });

    // DELETE endpoints
    this.delete('/vizitator/:id', async (ctx: any) => {
      try {
        const { id } = ctx.params;
        await this.db.runQuery('DELETE FROM vizitator WHERE id = ?', [id]);
        ctx.body = { message: 'Vizitator deleted successfully' };
      } catch (error) {
        console.log('Error deleting vizitator:', error);
        ctx.status = 500;
        ctx.body = { error: 'Failed to delete vizitator' };
      }
    });

    // Analytics and Data Warehouse endpoints
    this.get('/analytics/zoo-statistics', async (ctx: any) => {
      try {
        // Get comprehensive zoo statistics
        const zooStats = await this.db.getAllQuery(`
          SELECT 
            z.id,
            z.nume,
            z.locatie,
            z.suprafata,
            z.nr_angajati,
            COUNT(DISTINCT a.id) as angajati_reali,
            COUNT(DISTINCT an.id) as nr_animale,
            AVG(a.salariu) as salariu_mediu
          FROM zoo z
          LEFT JOIN angajat a ON z.id = a.zoo_id
          LEFT JOIN animal an ON z.id = an.zoo_id
          GROUP BY z.id, z.nume, z.locatie, z.suprafata, z.nr_angajati
        `);
        ctx.body = zooStats;
      } catch (error) {
        console.log('Database error for zoo statistics:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    this.get('/analytics/revenue-by-month', async (ctx: any) => {
      try {
        // Calculate revenue by month from bilet data
        const monthlyRevenue = await this.db.getAllQuery(`
          SELECT 
            strftime('%Y-%m', dataVanzarii) as month,
            COUNT(*) as tickets_sold,
            SUM(pretFinal) as total_revenue,
            AVG(pretFinal) as avg_price
          FROM bilet 
          WHERE dataVanzarii IS NOT NULL
          GROUP BY strftime('%Y-%m', dataVanzarii)
          ORDER BY month DESC
          LIMIT 12
        `);
        ctx.body = monthlyRevenue;
      } catch (error) {
        console.log('Database error for monthly revenue:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    this.get('/analytics/visitor-demographics', async (ctx: any) => {
      try {
        // Get visitor demographics
        const demographics = await this.db.getAllQuery(`
          SELECT 
            CASE 
              WHEN varsta < 18 THEN 'Copii (0-17)'
              WHEN varsta BETWEEN 18 AND 25 THEN 'Tineri (18-25)'
              WHEN varsta BETWEEN 26 AND 45 THEN 'Adulți (26-45)'
              WHEN varsta BETWEEN 46 AND 65 THEN 'Adulți Maturi (46-65)'
              ELSE 'Seniori (65+)'
            END as age_group,
            COUNT(*) as count,
            ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM vizitator), 2) as percentage
          FROM vizitator 
          GROUP BY age_group
          ORDER BY count DESC
        `);
        ctx.body = demographics;
      } catch (error) {
        console.log('Database error for visitor demographics:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    this.get('/analytics/employee-distribution', async (ctx: any) => {
      try {
        // Get employee distribution by function and zoo
        const distribution = await this.db.getAllQuery(`
          SELECT 
            z.nume as zoo_name,
            a.functie,
            COUNT(*) as count,
            AVG(a.salariu) as avg_salary,
            MIN(a.salariu) as min_salary,
            MAX(a.salariu) as max_salary
          FROM angajat a
          JOIN zoo z ON a.zoo_id = z.id
          GROUP BY z.nume, a.functie
          ORDER BY z.nume, count DESC
        `);
        ctx.body = distribution;
      } catch (error) {
        console.log('Database error for employee distribution:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    this.get('/analytics/animal-diversity', async (ctx: any) => {
      try {
        // Get animal diversity statistics
        const diversity = await this.db.getAllQuery(`
          SELECT 
            z.nume as zoo_name,
            a.specie,
            COUNT(*) as count,
            AVG(a.varsta) as avg_age,
            AVG(a.greutate) as avg_weight
          FROM animal a
          JOIN zoo z ON a.zoo_id = z.id
          GROUP BY z.nume, a.specie
          ORDER BY z.nume, count DESC
        `);
        ctx.body = diversity;
      } catch (error) {
        console.log('Database error for animal diversity:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    this.get('/analytics/etl-summary', async (ctx: any) => {
      try {
        // Get summary of all tables for ETL process
        const tables = ['zoo', 'angajat', 'vizitator', 'animal', 'eveniment', 'tip_bilet', 'bilet'];
        const summary = [];

        for (const table of tables) {
          const result = await this.db.getQuery(`SELECT COUNT(*) as count FROM ${table}`);
          const lastModified = await this.db.getQuery(`
            SELECT datetime('now', 'localtime') as current_time
          `);
          
          summary.push({
            table_name: table,
            record_count: result.count,
            last_updated: lastModified.current_time,
            status: result.count > 0 ? 'active' : 'empty'
          });
        }

        ctx.body = {
          summary,
          total_records: summary.reduce((sum, item) => sum + item.record_count, 0),
          active_tables: summary.filter(item => item.status === 'active').length,
          timestamp: new Date().toISOString()
        };
      } catch (error) {
        console.log('Database error for ETL summary:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    this.get('/analytics/event-statistics', async (ctx: any) => {
      try {
        // Get event statistics
        const eventStats = await this.db.getAllQuery(`
          SELECT 
            strftime('%Y-%m', e.data) as month,
            COUNT(*) as total_events,
            AVG(e.durata) as avg_duration,
            SUM(e.capacitateMaxima) as total_capacity,
            z.nume as zoo_name
          FROM eveniment e
          JOIN zoo z ON e.zoo_id = z.id
          WHERE e.data IS NOT NULL
          GROUP BY strftime('%Y-%m', e.data), z.nume
          ORDER BY month DESC
        `);
        ctx.body = eventStats;
      } catch (error) {
        console.log('Database error for event statistics:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    this.get('/analytics/ticket-sales-summary', async (ctx: any) => {
      try {
        // Get ticket sales summary
        const salesSummary = await this.db.getAllQuery(`
          SELECT 
            strftime('%Y-%m', b.dataVanzarii) as month,
            COUNT(b.id) as tickets_sold,
            SUM(b.pretFinal) as total_revenue,
            AVG(b.pretFinal) as avg_ticket_price,
            tb.nume as ticket_type,
            COUNT(DISTINCT v.id) as unique_visitors
          FROM bilet b
          LEFT JOIN tip_bilet tb ON b.tipBiletId = tb.id
          LEFT JOIN vizitator v ON b.vizitatorId = v.id
          WHERE b.dataVanzarii IS NOT NULL
          GROUP BY strftime('%Y-%m', b.dataVanzarii), tb.nume
          ORDER BY month DESC, total_revenue DESC
        `);
        ctx.body = salesSummary;
      } catch (error) {
        console.log('Database error for ticket sales summary:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    this.get('/analytics/zoo-performance-metrics', async (ctx: any) => {
      try {
        // Get comprehensive zoo performance metrics
        const performance = await this.db.getAllQuery(`
          SELECT 
            z.id,
            z.nume as zoo_name,
            z.locatie,
            z.suprafata,
            COUNT(DISTINCT a.id) as total_employees,
            COUNT(DISTINCT an.id) as total_animals,
            COUNT(DISTINCT e.id) as total_events,
            COUNT(DISTINCT v.id) as total_visits,
            COALESCE(SUM(b.pretFinal), 0) as total_revenue,
            ROUND(z.suprafata / COUNT(DISTINCT an.id), 2) as space_per_animal
          FROM zoo z
          LEFT JOIN angajat a ON z.id = a.zoo_id
          LEFT JOIN animal an ON z.id = an.zoo_id
          LEFT JOIN eveniment e ON z.id = e.zoo_id
          LEFT JOIN vizita v ON z.id = v.zoo_id
          LEFT JOIN bilet b ON e.id = b.evenimentId
          GROUP BY z.id, z.nume, z.locatie, z.suprafata
          ORDER BY total_revenue DESC
        `);
        ctx.body = performance;
      } catch (error) {
        console.log('Database error for zoo performance metrics:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    this.get('/analytics/monthly-trends', async (ctx: any) => {
      try {
        // Get monthly trends data
        const trends = await this.db.getAllQuery(`
          SELECT 
            strftime('%Y-%m', date_field) as month,
            SUM(CASE WHEN source = 'bilet' THEN 1 ELSE 0 END) as tickets,
            SUM(CASE WHEN source = 'eveniment' THEN 1 ELSE 0 END) as events,
            SUM(CASE WHEN source = 'vizita' THEN 1 ELSE 0 END) as visits,
            SUM(CASE WHEN source = 'bilet' THEN revenue ELSE 0 END) as revenue
          FROM (
            SELECT dataVanzarii as date_field, 'bilet' as source, pretFinal as revenue FROM bilet WHERE dataVanzarii IS NOT NULL
            UNION ALL
            SELECT data as date_field, 'eveniment' as source, 0 as revenue FROM eveniment WHERE data IS NOT NULL
            UNION ALL
            SELECT data_vizita as date_field, 'vizita' as source, pret_bilet as revenue FROM vizita WHERE data_vizita IS NOT NULL
          ) combined
          GROUP BY strftime('%Y-%m', date_field)
          ORDER BY month DESC
          LIMIT 12
        `);
        ctx.body = trends;
      } catch (error) {
        console.log('Database error for monthly trends:', error);
        ctx.status = 500;
        ctx.body = { error: 'Database error' };
      }
    });

    this.post('/analytics/simulate-etl', async (ctx: any) => {
      try {
        const { operation, tables } = ctx.request.body;
        
        // Simulate ETL process
        const results = [];
        const targetTables = tables || ['zoo', 'angajat', 'vizitator', 'animal'];
        
        for (const table of targetTables) {
          const count = await this.db.getQuery(`SELECT COUNT(*) as count FROM ${table}`);
          
          results.push({
            table: table,
            operation: operation,
            records_processed: count.count,
            status: 'success',
            timestamp: new Date().toISOString(),
            details: `${operation} completed for ${count.count} records in ${table} table`
          });
        }

        ctx.body = {
          operation: operation,
          results: results,
          total_records: results.reduce((sum, r) => sum + r.records_processed, 0),
          timestamp: new Date().toISOString()
        };
      } catch (error) {
        console.log('Database error for ETL simulation:', error);
        ctx.status = 500;
        ctx.body = { error: 'Failed to simulate ETL process' };
      }
    });
  }
}
