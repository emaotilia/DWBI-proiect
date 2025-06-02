import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

// Core entities
export interface Zoo {
  id: number;
  denumire: string;
  oras: string;
}

export interface Angajat {
  id: number;
  nume: string;
  functie: string;
  salariu: number;
  id_zoo: number;
}

export interface Studiu {
  id: number;
  nume: string;
}

export interface Calificare {
  id: number;
  angajatId: number;
  studiuId: number;
}

export interface Vizitator {
  id: number;
  nume: string;
  grup_varsta: string;
}

export interface TipBilet {
  id: number;
  nume_tip: string;
}

export interface Eveniment {
  id: number;
  nume: string;
}

export interface PlanificareEveniment {
  id: number;
  evenimentId: number;
  zooId: number;
  data: Date;
}

export interface Bilet {
  id: number;
  numarBilet: string;
  dataVanzarii: string;
  evenimentId: number;
  vizitatorId: number;
  tipBiletId: number;
  pretFinal: number;
}

export interface Tarc {
  id: number;
  tipHabitat: string;
  lungime: number;
  latime: number;
  inaltime: number;
  zooId: number;
}

export interface Specie {
  id: number;
  denumire: string;
}

export interface Animal {
  id: number;
  data_nastere: string;
  specie_id: number;
  tarc_id: number;
}

export interface Mancare {
  id: number;
  nume: string;
}

export interface SeHranesteCu {
  id: number;
  specieId: number;
  mancareId: number;
  cantitateZilnica: number;
}

export interface ETLLog {
  id: number;
  timestamp: string;
  sourceTable: string;
  operation: string;
  recordCount: number;
  status: 'success' | 'error' | 'processing';
  details: string;
}

@Injectable({
  providedIn: 'root'
})
export class ZooDataService {
  private readonly API_BASE_URL = 'http://localhost:3000';

  // BehaviorSubjects for reactive data management
  private zoosSubject = new BehaviorSubject<Zoo[]>([]);
  private studiuSubject = new BehaviorSubject<Studiu[]>([]);
  private angajatiSubject = new BehaviorSubject<Angajat[]>([]);
  private calificariSubject = new BehaviorSubject<Calificare[]>([]);
  private vizitatoriSubject = new BehaviorSubject<Vizitator[]>([]);
  private tipBileteSubject = new BehaviorSubject<TipBilet[]>([]);
  private evenimenteSubject = new BehaviorSubject<Eveniment[]>([]);
  private planificariEvenimenteSubject = new BehaviorSubject<PlanificareEveniment[]>([]);
  private bileteSubject = new BehaviorSubject<Bilet[]>([]);
  private tarcuriSubject = new BehaviorSubject<Tarc[]>([]);
  private speciiSubject = new BehaviorSubject<Specie[]>([]);
  private animaleSubject = new BehaviorSubject<Animal[]>([]);
  private mancareSubject = new BehaviorSubject<Mancare[]>([]);
  private hranireSubject = new BehaviorSubject<SeHranesteCu[]>([]);
  private etlLogsSubject = new BehaviorSubject<ETLLog[]>([]);

  // Observable streams for all entities
  zoos$ = this.zoosSubject.asObservable();
  angajati$ = this.angajatiSubject.asObservable();
  studii$ = this.studiuSubject.asObservable();
  calificari$ = this.calificariSubject.asObservable();
  vizitatori$ = this.vizitatoriSubject.asObservable();
  tipBilete$ = this.tipBileteSubject.asObservable();
  evenimente$ = this.evenimenteSubject.asObservable();
  planificariEvenimente$ = this.planificariEvenimenteSubject.asObservable();
  bilete$ = this.bileteSubject.asObservable();
  tarcuri$ = this.tarcuriSubject.asObservable();
  specii$ = this.speciiSubject.asObservable();
  animale$ = this.animaleSubject.asObservable();
  mancare$ = this.mancareSubject.asObservable();
  hranire$ = this.hranireSubject.asObservable();
  etlLogs$ = this.etlLogsSubject.asObservable();

  private transformZoo(zoo: any): Zoo {
    return {
      id: zoo.id_zoo,
      denumire: zoo.denumire,
      oras: zoo.oras
    };
  }

private transformAngajat(angajat: any): Angajat {
 return {
  id: angajat.id_angajat,
  nume: angajat.nume,
  functie: angajat.functie,
  salariu: angajat.salariu,
  id_zoo: angajat.id_zoo
 };
}

private transformStudiu(studiu: any): Studiu {
  return {
    id: studiu.id_studiu,
    nume: studiu.studiu
  };
}

private transformCalificare(calificare: any): Calificare {
  return {
    id: calificare.id_calificare,
    angajatId: calificare.id_angajat,
    studiuId: calificare.id_studiu
  }
}

private transformVizitator(vizitator: any): Vizitator {
  return {
    id: vizitator.id_vizitator,
    nume: vizitator.nume,
    grup_varsta: vizitator.grup_varsta,
  }
} 

private transformTipBilet(tip_bilet: any): TipBilet {
  return {
    id: tip_bilet.id_tip_bilet,
    nume_tip: tip_bilet.nume_tip,
  }
}

private transformEveniment(eveniment: any): Eveniment {
  return {
    id: eveniment.id_eveniment,
    nume: eveniment.denumire_eveniment
  };
}

private transformPlanificareEveniment(planificare_eveniment: any): PlanificareEveniment {
  return {
    id: planificare_eveniment.id_eveniment,
    evenimentId: planificare_eveniment.id_eveniment,
    zooId: planificare_eveniment.id_zoo,
    data: planificare_eveniment.data_eveniment,
  }
}

private transformTarc(tarc: any): Tarc {
  return {
    id: tarc.id_tarc,
    tipHabitat: tarc.tip_tarc,
    lungime: tarc.lungime,
    latime: tarc.latime,
    inaltime: tarc.inaltime,
    zooId: tarc.id_zoo,
  }
}

private transformSpecie(specie: any): Specie {
  return {
    id: specie.id_specie,
    denumire: specie.denumire
  }
}

private transformAnimal(animal: any): Animal {
  return {
    id: animal.id_animal,
    data_nastere: animal.data_nasterii,
    specie_id: animal.id_specie,
    tarc_id: animal.id_tarc
  }
}

private transformMancare(mancare: any): Mancare {
  return {
    id: mancare.id_mancare,
    nume: mancare.continut
  }
}

private transformSeHranesteCu(se_hraneste_cu: any): SeHranesteCu {
  return {
    id: se_hraneste_cu.id_specie,
    specieId: se_hraneste_cu.id_specie,
    mancareId: se_hraneste_cu.id_mancare,
    cantitateZilnica: se_hraneste_cu.cantitate_medie_zilnica
  }
}

  constructor(private http: HttpClient) {
    this.loadAllData();
  }

  // Load all data from backend on service initialization
  private loadAllData(): void {
    this.loadZoos();
    this.loadAngajati();
    this.loadStudii();
    this.loadCalificari();
    this.loadVizitatori();
    this.loadTipBilete();
    this.loadEvenimente();
    this.loadPlanificariEvenimente();
    this.loadTarcuri();
    this.loadSpecii();
    this.loadAnimale();
    this.loadMancare();
    this.loadHranire();
  }

  // HTTP service methods to load data from backend
  private loadZoos(): void {
    this.http.get<any[]>(`${this.API_BASE_URL}/zoo`)
      .pipe(
        map(data => data.map(zoo => this.transformZoo(zoo))),
        catchError(error => {
          console.error('Error loading zoos:', error);
          return of([]);
        })
      )
      .subscribe((mappedZoos: Zoo[]) => this.zoosSubject.next(mappedZoos));
  }
  
  private loadAngajati(): void {
    this.http.get<Angajat[]>(`${this.API_BASE_URL}/angajat`)
      .pipe(
        map(data => data.map(angajat => this.transformAngajat(angajat))),
        catchError(error => {
          console.error('Error loading angajati:', error);
          return of([]);
        })
      )
      .subscribe(data => this.angajatiSubject.next(data));
  }

  private loadStudii(): void {
    this.http.get<Studiu[]>(`${this.API_BASE_URL}/studiu`)
      .pipe(
        map(data => data.map(studiu => this.transformStudiu(studiu))),
        catchError(error => {
          console.error('Error loading studii:', error);
          return of([]);
        })
      )
      .subscribe(data => this.studiuSubject.next(data));
  }

  private loadCalificari(): void {
    this.http.get<Calificare[]>(`${this.API_BASE_URL}/calificare`)
      .pipe(
        map(data => data.map(calificare => this.transformCalificare(calificare))),
        catchError(error => {
          console.error('Error loading calificari:', error);
          return of([]);
        })
      )
      .subscribe(data => this.calificariSubject.next(data));
  }

  private loadVizitatori(): void {
    this.http.get<Vizitator[]>(`${this.API_BASE_URL}/vizitator`)
      .pipe(
        map(data => data.map(vizitator => this.transformVizitator(vizitator))),
        catchError(error => {
          console.error('Error loading vizitatori:', error);
          return of([]);
        })
      )
      .subscribe(data => this.vizitatoriSubject.next(data));
  }

  private loadTipBilete(): void {
    this.http.get<TipBilet[]>(`${this.API_BASE_URL}/tip_bilet`)
      .pipe(
        map(data => data.map(tip_bilet => this.transformTipBilet(tip_bilet))),
        catchError(error => {
          console.error('Error loading tip_bilet:', error);
          return of([]);
        })
      )
      .subscribe(data => this.tipBileteSubject.next(data));
  }

  private loadEvenimente(): void {
    this.http.get<Eveniment[]>(`${this.API_BASE_URL}/eveniment`)
      .pipe(
        map(data => data.map(eveniment => this.transformEveniment(eveniment))),
        catchError(error => {
          console.error('Error loading evenimente:', error);
          return of([]);
        })
      )
      .subscribe(data => this.evenimenteSubject.next(data));
  }

  private loadPlanificariEvenimente(): void {
    this.http.get<PlanificareEveniment[]>(`${this.API_BASE_URL}/planificare_eveniment`)
      .pipe(
        map(data => data.map(planificare_eveniment => this.transformPlanificareEveniment(planificare_eveniment))),
        catchError(error => {
          console.error('Error loading planificare_eveniment:', error);
          return of([]);
        })
      )
      .subscribe(data => this.planificariEvenimenteSubject.next(data));
  }

  private loadTarcuri(): void {
    this.http.get<Tarc[]>(`${this.API_BASE_URL}/tarc`)
      .pipe(
        map(data => data.map(tarc => this.transformTarc(tarc))),
        catchError(error => {
          console.error('Error loading tarcuri:', error);
          return of([]);
        })
      )
      .subscribe(data => this.tarcuriSubject.next(data));
  }

  private loadSpecii(): void {
    this.http.get<Specie[]>(`${this.API_BASE_URL}/specie`)
      .pipe(
        map(data => data.map(specie => this.transformSpecie(specie))),
        catchError(error => {
          console.error('Error loading specii:', error);
          return of([]);
        })
      )
      .subscribe(data => this.speciiSubject.next(data));
  }

  private loadAnimale(): void {
    this.http.get<Animal[]>(`${this.API_BASE_URL}/animal`)
      .pipe(
        map(data => data.map(animal => this.transformAnimal(animal))),
        catchError(error => {
          console.error('Error loading animale:', error);
          return of([]);
        })
      )
      .subscribe(data => this.animaleSubject.next(data));
  }

  private loadMancare(): void {
    this.http.get<Mancare[]>(`${this.API_BASE_URL}/mancare`)
      .pipe(
        map(data => data.map(mancare => this.transformMancare(mancare))),
        catchError(error => {
          console.error('Error loading mancare:', error);
          return of([]);
        })
      )
      .subscribe(data => this.mancareSubject.next(data));
  }

  private loadHranire(): void {
    this.http.get<SeHranesteCu[]>(`${this.API_BASE_URL}/se_hraneste_cu`)
      .pipe(
        map(data => data.map(se_hraneste_cu => this.transformSeHranesteCu(se_hraneste_cu))),
        catchError(error => {
          console.error('Error loading se_hraneste_cu:', error);
          return of([]);
        })
      )
      .subscribe(data => this.hranireSubject.next(data));
  }

  // Zoo CRUD operations - with real backend integration
  addZoo(zoo: Zoo): void {
    const backendZoo = {
      id_zoo: zoo.id,
      denumire: zoo.denumire,
      oras: zoo.oras
    };
  
    this.http.post(`${this.API_BASE_URL}/zoo`, backendZoo)
      .pipe(
        catchError(error => {
          console.error('Error adding zoo:', error);
          this.addETLLog('zoo', 'INSERT', 0, 'error', `Failed to add zoo "${zoo.denumire}": ${error.message}`);
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.addETLLog('zoo', 'INSERT', 1, 'success', `Zoo "${zoo.denumire}" added successfully`);
          this.loadZoos();
        }
      });
  }
  
  

  updateZoo(id: number, zoo: Partial<Zoo>): void {
    this.http.put(`${this.API_BASE_URL}/zoo/${id}`, zoo)
      .pipe(
        catchError(error => {
          console.error('Error updating zoo:', error);
          this.addETLLog('zoo', 'UPDATE', 0, 'error', `Failed to update zoo with ID ${id}: ${error.message}`);
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.addETLLog('zoo', 'UPDATE', 1, 'success', `Zoo with ID ${id} updated successfully`);
          // Reload data from backend
          this.loadZoos();
        }
      });
  }

  deleteZoo(id: number): void {
    this.http.delete(`${this.API_BASE_URL}/zoo/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error deleting zoo:', error);
          this.addETLLog('zoo', 'DELETE', 0, 'error', `Failed to delete zoo with ID ${id}: ${error.message}`);
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.addETLLog('zoo', 'DELETE', 1, 'success', `Zoo with ID ${id} deleted successfully`);
          // Reload data from backend
          this.loadZoos();
        }
      });
  }

  // Angajat CRUD operations - with real backend integration
  addAngajat(angajat: Angajat): void {
    const backendAngajat = {
      id_angajat: angajat.id,
      nume: angajat.nume,
      functie: angajat.functie,
      salariu: angajat.salariu,
      id_zoo: angajat.id_zoo
    }
    this.http.post(`${this.API_BASE_URL}/angajat`, backendAngajat)
      .pipe(
        catchError(error => {
          console.error('Error adding angajat:', error);
          this.addETLLog('angajat', 'INSERT', 0, 'error', `Failed to add employee "${angajat.nume} ": ${error.message}`);
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.addETLLog('angajat', 'INSERT', 1, 'success', `Employee "${angajat.nume} " added successfully`);
          this.loadAngajati();
        }
      });
  }

  updateAngajat(id: number, angajat: Partial<Angajat>): void {
    this.http.put(`${this.API_BASE_URL}/angajat/${id}`, angajat)
      .pipe(
        catchError(error => {
          console.error('Error updating angajat:', error);
          this.addETLLog('angajat', 'UPDATE', 0, 'error', `Failed to update employee with ID ${id}: ${error.message}`);
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.addETLLog('angajat', 'UPDATE', 1, 'success', `Employee with ID ${id} updated successfully`);
          this.loadAngajati();
        }
      });
  }

  deleteAngajat(id: number): void {
    this.http.delete(`${this.API_BASE_URL}/angajat/${id}`)
      .pipe(
        catchError(error => {
          console.error('Error deleting angajat:', error);
          this.addETLLog('angajat', 'DELETE', 0, 'error', `Failed to delete employee with ID ${id}: ${error.message}`);
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.addETLLog('angajat', 'DELETE', 1, 'success', `Employee with ID ${id} deleted successfully`);
          this.loadAngajati();
        }
      });
  }

  private addETLLog(sourceTable: string, operation: string, recordCount: number, status: 'success' | 'error', details: string): void {
    const currentLogs = this.etlLogsSubject.value;
    const newId = currentLogs.length > 0 ? Math.max(...currentLogs.map(l => l.id)) + 1 : 1;
    const newLog: ETLLog = {
      id: newId,
      timestamp: new Date().toLocaleString('ro-RO'),
      sourceTable,
      operation,
      recordCount,
      status,
      details
    };
    this.etlLogsSubject.next([newLog, ...currentLogs]);
  }

  // Analytics API methods - Real backend integration
  getZooStatistics(): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/analytics/zoo-statistics`)
      .pipe(
        catchError(error => {
          console.error('Error loading zoo statistics:', error);
          return of([]);
        })
      );
  }

  getRevenueByMonth(): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/analytics/revenue-by-month`)
      .pipe(
        catchError(error => {
          console.error('Error loading revenue data:', error);
          return of([]);
        })
      );
  }

  getVisitorDemographics(): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/analytics/visitor-demographics`)
      .pipe(
        catchError(error => {
          console.error('Error loading visitor demographics:', error);
          return of([]);
        })
      );
  }

  getEmployeeDistribution(): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/analytics/employee-distribution`)
      .pipe(
        catchError(error => {
          console.error('Error loading employee distribution:', error);
          return of([]);
        })
      );
  }

  getAnimalDiversity(): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/analytics/animal-diversity`)
      .pipe(
        catchError(error => {
          console.error('Error loading animal diversity:', error);
          return of([]);
        })
      );
  }

  getETLSummary(): Observable<any> {
    return this.http.get(`${this.API_BASE_URL}/analytics/etl-summary`)
      .pipe(
        catchError(error => {
          console.error('Error loading ETL summary:', error);
          return of({ totalRecords: 0, lastUpdate: null, tablesProcessed: 0 });
        })
      );
  }

  simulateBackendETL(): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}/analytics/simulate-etl`, {})
      .pipe(
        catchError(error => {
          console.error('Error simulating ETL:', error);
          return of({ success: false, message: 'ETL simulation failed' });
        })
      );
  }

  // Additional analytics methods for reporting
  getEventStatistics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_BASE_URL}/analytics/event-statistics`)
      .pipe(
        catchError(error => {
          console.error('Error loading event statistics:', error);
          return of([]);
        })
      );
  }

  getTicketSalesSummary(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_BASE_URL}/analytics/ticket-sales-summary`)
      .pipe(
        catchError(error => {
          console.error('Error loading ticket sales summary:', error);
          return of([]);
        })
      );
  }

  getZooPerformanceMetrics(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_BASE_URL}/analytics/zoo-performance-metrics`)
      .pipe(
        catchError(error => {
          console.error('Error loading zoo performance metrics:', error);
          return of([]);
        })
      );
  }

  getMonthlyTrends(): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_BASE_URL}/analytics/monthly-trends`)
      .pipe(
        catchError(error => {
          console.error('Error loading monthly trends:', error);
          return of([]);
        })
      );
  }

  // Complete CRUD operations for all entities

  // Studiu CRUD
  addStudiu(studiu: Omit<Studiu, 'id'>): void {
    const current = this.studiuSubject.value;
    const newId = Math.max(...current.map(s => s.id)) + 1;
    const newStudiu = { ...studiu, id: newId };
    this.studiuSubject.next([...current, newStudiu]);
    this.addETLLog('studiu', 'INSERT', 1, 'success', `Study "${studiu.nume}" added successfully`);
  }

  updateStudiu(id: number, studiu: Partial<Studiu>): void {
    const current = this.studiuSubject.value;
    const index = current.findIndex(s => s.id === id);
    if (index !== -1) {
      current[index] = { ...current[index], ...studiu };
      this.studiuSubject.next([...current]);
      this.addETLLog('studiu', 'UPDATE', 1, 'success', `Study with ID ${id} updated successfully`);
    }
  }

  deleteStudiu(id: number): void {
    const current = this.studiuSubject.value;
    const filtered = current.filter(s => s.id !== id);
    this.studiuSubject.next(filtered);
    this.addETLLog('studiu', 'DELETE', 1, 'success', `Study with ID ${id} deleted successfully`);
  }

  // Calificare CRUD
  addCalificare(calificare: Omit<Calificare, 'id'>): void {
    const current = this.calificariSubject.value;
    const newId = Math.max(...current.map(c => c.id)) + 1;
    const newCalificare = { ...calificare, id: newId };
    this.calificariSubject.next([...current, newCalificare]);
    this.addETLLog('calificare', 'INSERT', 1, 'success', `Qualification added successfully`);
  }

  updateCalificare(id: number, calificare: Partial<Calificare>): void {
    const current = this.calificariSubject.value;
    const index = current.findIndex(c => c.id === id);
    if (index !== -1) {
      current[index] = { ...current[index], ...calificare };
      this.calificariSubject.next([...current]);
      this.addETLLog('calificare', 'UPDATE', 1, 'success', `Qualification with ID ${id} updated successfully`);
    }
  }

  deleteCalificare(id: number): void {
    const current = this.calificariSubject.value;
    const filtered = current.filter(c => c.id !== id);
    this.calificariSubject.next(filtered);
    this.addETLLog('calificare', 'DELETE', 1, 'success', `Qualification with ID ${id} deleted successfully`);
  }

  // Vizitator CRUD
  addVizitator(vizitator: Omit<Vizitator, 'id'>): void {
    const current = this.vizitatoriSubject.value;
    const newId = Math.max(...current.map(v => v.id)) + 1;
    const newVizitator = { ...vizitator, id: newId };
    this.vizitatoriSubject.next([...current, newVizitator]);
    this.addETLLog('vizitator', 'INSERT', 1, 'success', `Visitor "${vizitator.nume} " added successfully`);
  }

  updateVizitator(id: number, vizitator: Partial<Vizitator>): void {
    const current = this.vizitatoriSubject.value;
    const index = current.findIndex(v => v.id === id);
    if (index !== -1) {
      current[index] = { ...current[index], ...vizitator };
      this.vizitatoriSubject.next([...current]);
      this.addETLLog('vizitator', 'UPDATE', 1, 'success', `Visitor with ID ${id} updated successfully`);
    }
  }

  deleteVizitator(id: number): void {
    const current = this.vizitatoriSubject.value;
    const filtered = current.filter(v => v.id !== id);
    this.vizitatoriSubject.next(filtered);
    this.addETLLog('vizitator', 'DELETE', 1, 'success', `Visitor with ID ${id} deleted successfully`);
  }

  // TipBilet CRUD
  addTipBilet(tipBilet: Omit<TipBilet, 'id'>): void {
    const current = this.tipBileteSubject.value;
    const newId = Math.max(...current.map(t => t.id)) + 1;
    const newTipBilet = { ...tipBilet, id: newId };
    this.tipBileteSubject.next([...current, newTipBilet]);
    this.addETLLog('tip_bilet', 'INSERT', 1, 'success', `Ticket type "${tipBilet.nume_tip}" added successfully`);
  }

  updateTipBilet(id: number, tipBilet: Partial<TipBilet>): void {
    const current = this.tipBileteSubject.value;
    const index = current.findIndex(t => t.id === id);
    if (index !== -1) {
      current[index] = { ...current[index], ...tipBilet };
      this.tipBileteSubject.next([...current]);
      this.addETLLog('tip_bilet', 'UPDATE', 1, 'success', `Ticket type with ID ${id} updated successfully`);
    }
  }

  deleteTipBilet(id: number): void {
    const current = this.tipBileteSubject.value;
    const filtered = current.filter(t => t.id !== id);
    this.tipBileteSubject.next(filtered);
    this.addETLLog('tip_bilet', 'DELETE', 1, 'success', `Ticket type with ID ${id} deleted successfully`);
  }

  // Eveniment CRUD
  addEveniment(eveniment: Omit<Eveniment, 'id'>): void {
    const current = this.evenimenteSubject.value;
    const newId = Math.max(...current.map(e => e.id)) + 1;
    const newEveniment = { ...eveniment, id: newId };
    this.evenimenteSubject.next([...current, newEveniment]);
    this.addETLLog('eveniment', 'INSERT', 1, 'success', `Event "${eveniment.nume}" added successfully`);
  }

  updateEveniment(id: number, eveniment: Partial<Eveniment>): void {
    const current = this.evenimenteSubject.value;
    const index = current.findIndex(e => e.id === id);
    if (index !== -1) {
      current[index] = { ...current[index], ...eveniment };
      this.evenimenteSubject.next([...current]);
      this.addETLLog('eveniment', 'UPDATE', 1, 'success', `Event with ID ${id} updated successfully`);
    }
  }

  deleteEveniment(id: number): void {
    const current = this.evenimenteSubject.value;
    const filtered = current.filter(e => e.id !== id);
    this.evenimenteSubject.next(filtered);
    this.addETLLog('eveniment', 'DELETE', 1, 'success', `Event with ID ${id} deleted successfully`);
  }

  // PlanificareEveniment CRUD
  addPlanificareEveniment(planificare: Omit<PlanificareEveniment, 'id'>): void {
    const current = this.planificariEvenimenteSubject.value;
    const newId = Math.max(...current.map(p => p.id)) + 1;
    const newPlanificare = { ...planificare, id: newId };
    this.planificariEvenimenteSubject.next([...current, newPlanificare]);
    this.addETLLog('planificare_eveniment', 'INSERT', 1, 'success', `Event planning added successfully`);
  }

  updatePlanificareEveniment(id: number, planificare: Partial<PlanificareEveniment>): void {
    const current = this.planificariEvenimenteSubject.value;
    const index = current.findIndex(p => p.id === id);
    if (index !== -1) {
      current[index] = { ...current[index], ...planificare };
      this.planificariEvenimenteSubject.next([...current]);
      this.addETLLog('planificare_eveniment', 'UPDATE', 1, 'success', `Event planning with ID ${id} updated successfully`);
    }
  }

  deletePlanificareEveniment(id: number): void {
    const current = this.planificariEvenimenteSubject.value;
    const filtered = current.filter(p => p.id !== id);
    this.planificariEvenimenteSubject.next(filtered);
    this.addETLLog('planificare_eveniment', 'DELETE', 1, 'success', `Event planning with ID ${id} deleted successfully`);
  }

  // Bilet CRUD
  addBilet(bilet: Omit<Bilet, 'id'>): void {
    const current = this.bileteSubject.value;
    const newId = Math.max(...current.map(b => b.id)) + 1;
    const newBilet = { ...bilet, id: newId };
    this.bileteSubject.next([...current, newBilet]);
    this.addETLLog('bilet', 'INSERT', 1, 'success', `Ticket "${bilet.numarBilet}" added successfully`);
  }

  updateBilet(id: number, bilet: Partial<Bilet>): void {
    const current = this.bileteSubject.value;
    const index = current.findIndex(b => b.id === id);
    if (index !== -1) {
      current[index] = { ...current[index], ...bilet };
      this.bileteSubject.next([...current]);
      this.addETLLog('bilet', 'UPDATE', 1, 'success', `Ticket with ID ${id} updated successfully`);
    }
  }

  deleteBilet(id: number): void {
    const current = this.bileteSubject.value;
    const filtered = current.filter(b => b.id !== id);
    this.bileteSubject.next(filtered);
    this.addETLLog('bilet', 'DELETE', 1, 'success', `Ticket with ID ${id} deleted successfully`);
  }

  // Tarc CRUD
  addTarc(tarc: Omit<Tarc, 'id'>): void {
    const current = this.tarcuriSubject.value;
    const newId = Math.max(...current.map(t => t.id)) + 1;
    const newTarc = { ...tarc, id: newId };
    this.tarcuriSubject.next([...current, newTarc]);
    this.addETLLog('tarc', 'INSERT', 1, 'success', `Enclosure added successfully`);
  }

  updateTarc(id: number, tarc: Partial<Tarc>): void {
    const current = this.tarcuriSubject.value;
    const index = current.findIndex(t => t.id === id);
    if (index !== -1) {
      current[index] = { ...current[index], ...tarc };
      this.tarcuriSubject.next([...current]);
      this.addETLLog('tarc', 'UPDATE', 1, 'success', `Enclosure with ID ${id} updated successfully`);
    }
  }

  deleteTarc(id: number): void {
    const current = this.tarcuriSubject.value;
    const filtered = current.filter(t => t.id !== id);
    this.tarcuriSubject.next(filtered);
    this.addETLLog('tarc', 'DELETE', 1, 'success', `Enclosure with ID ${id} deleted successfully`);
  }

  // Specie CRUD
  addSpecie(specie: Omit<Specie, 'id'>): void {
    const current = this.speciiSubject.value;
    const newId = Math.max(...current.map(s => s.id)) + 1;
    const newSpecie = { ...specie, id: newId };
    this.speciiSubject.next([...current, newSpecie]);
    this.addETLLog('specie', 'INSERT', 1, 'success', `Species "${specie.denumire}" added successfully`);
  }

  updateSpecie(id: number, specie: Partial<Specie>): void {
    const current = this.speciiSubject.value;
    const index = current.findIndex(s => s.id === id);
    if (index !== -1) {
      current[index] = { ...current[index], ...specie };
      this.speciiSubject.next([...current]);
      this.addETLLog('specie', 'UPDATE', 1, 'success', `Species with ID ${id} updated successfully`);
    }
  }

  deleteSpecie(id: number): void {
    const current = this.speciiSubject.value;
    const filtered = current.filter(s => s.id !== id);
    this.speciiSubject.next(filtered);
    this.addETLLog('specie', 'DELETE', 1, 'success', `Species with ID ${id} deleted successfully`);
  }

  // Animal CRUD
  addAnimal(animal: Omit<Animal, 'id'>): void {
    const current = this.animaleSubject.value;
    const newId = Math.max(...current.map(a => a.id)) + 1;
    const newAnimal = { ...animal, id: newId };
    this.animaleSubject.next([...current, newAnimal]);
    this.addETLLog('animal', 'INSERT', 1, 'success', `Animal  added successfully`);
  }

  updateAnimal(id: number, animal: Partial<Animal>): void {
    const current = this.animaleSubject.value;
    const index = current.findIndex(a => a.id === id);
    if (index !== -1) {
      current[index] = { ...current[index], ...animal };
      this.animaleSubject.next([...current]);
      this.addETLLog('animal', 'UPDATE', 1, 'success', `Animal with ID ${id} updated successfully`);
    }
  }

  deleteAnimal(id: number): void {
    const current = this.animaleSubject.value;
    const filtered = current.filter(a => a.id !== id);
    this.animaleSubject.next(filtered);
    this.addETLLog('animal', 'DELETE', 1, 'success', `Animal with ID ${id} deleted successfully`);
  }

  // Mancare CRUD
  addMancare(mancare: Omit<Mancare, 'id'>): void {
    const current = this.mancareSubject.value;
    const newId = Math.max(...current.map(m => m.id)) + 1;
    const newMancare = { ...mancare, id: newId };
    this.mancareSubject.next([...current, newMancare]);
    this.addETLLog('mancare', 'INSERT', 1, 'success', `Food "${mancare.nume}" added successfully`);
  }

  updateMancare(id: number, mancare: Partial<Mancare>): void {
    const current = this.mancareSubject.value;
    const index = current.findIndex(m => m.id === id);
    if (index !== -1) {
      current[index] = { ...current[index], ...mancare };
      this.mancareSubject.next([...current]);
      this.addETLLog('mancare', 'UPDATE', 1, 'success', `Food with ID ${id} updated successfully`);
    }
  }

  deleteMancare(id: number): void {
    const current = this.mancareSubject.value;
    const filtered = current.filter(m => m.id !== id);
    this.mancareSubject.next(filtered);
    this.addETLLog('mancare', 'DELETE', 1, 'success', `Food with ID ${id} deleted successfully`);
  }

  // SeHranesteCu CRUD
  addSeHranesteCu(hranire: Omit<SeHranesteCu, 'id'>): void {
    const current = this.hranireSubject.value;
    const newId = Math.max(...current.map(h => h.id)) + 1;
    const newHranire = { ...hranire, id: newId };
    this.hranireSubject.next([...current, newHranire]);
    this.addETLLog('se_hraneste_cu', 'INSERT', 1, 'success', `Feeding relationship added successfully`);
  }

  updateSeHranesteCu(id: number, hranire: Partial<SeHranesteCu>): void {
    const current = this.hranireSubject.value;
    const index = current.findIndex(h => h.id === id);
    if (index !== -1) {
      current[index] = { ...current[index], ...hranire };
      this.hranireSubject.next([...current]);
      this.addETLLog('se_hraneste_cu', 'UPDATE', 1, 'success', `Feeding relationship with ID ${id} updated successfully`);
    }
  }

  deleteSeHranesteCu(id: number): void {
    const current = this.hranireSubject.value;
    const filtered = current.filter(h => h.id !== id);
    this.hranireSubject.next(filtered);
    this.addETLLog('se_hraneste_cu', 'DELETE', 1, 'success', `Feeding relationship with ID ${id} deleted successfully`);
  }

  // ETL simulation methods
  simulateETLExtraction(sourceTable: string): Observable<ETLLog> {
    return new Observable(observer => {
      setTimeout(() => {
        this.addETLLog(sourceTable, 'EXTRACT', Math.floor(Math.random() * 100) + 1, 'success', `Data extracted from ${sourceTable} table`);
        observer.next(this.etlLogsSubject.value[0]);
        observer.complete();
      }, 2000);
    });
  }

  simulateETLTransformation(sourceTable: string): Observable<ETLLog> {
    return new Observable(observer => {
      setTimeout(() => {
        this.addETLLog(sourceTable, 'TRANSFORM', Math.floor(Math.random() * 100) + 1, 'success', `Data transformed for ${sourceTable} table`);
        observer.next(this.etlLogsSubject.value[0]);
        observer.complete();
      }, 3000);
    });
  }

  simulateETLLoad(sourceTable: string): Observable<ETLLog> {
    return new Observable(observer => {
      setTimeout(() => {
        this.addETLLog(sourceTable, 'LOAD', Math.floor(Math.random() * 100) + 1, 'success', `Data loaded to data warehouse for ${sourceTable} table`);
        observer.next(this.etlLogsSubject.value[0]);
        observer.complete();
      }, 1500);
    });
  }

  // Data validation simulation
  simulateDataValidation(): Observable<ETLLog> {
    return new Observable(observer => {
      setTimeout(() => {
        const validationResult = Math.random() > 0.1 ? 'success' : 'error';
        const details = validationResult === 'success' 
          ? 'All data integrity checks passed' 
          : 'Data validation failed: Found inconsistencies in foreign key relationships';
        this.addETLLog('validation', 'VALIDATE', 0, validationResult, details);
        observer.next(this.etlLogsSubject.value[0]);
        observer.complete();
      }, 2500);
    });
  }

  // Sync modifications simulation
  simulateSyncModifications(): Observable<ETLLog> {
    return new Observable(observer => {
      setTimeout(() => {
        this.addETLLog('sync', 'SYNC', Math.floor(Math.random() * 50) + 1, 'success', 'OLTP modifications synchronized with data warehouse');
        observer.next(this.etlLogsSubject.value[0]);
        observer.complete();
      }, 3500);
    });
  }
}
