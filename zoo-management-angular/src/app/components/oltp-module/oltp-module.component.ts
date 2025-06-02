import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  ZooDataService, 
  Zoo, 
  Angajat, 
  Studiu,
  Calificare,
  Vizitator,
  TipBilet,
  Eveniment, 
  PlanificareEveniment,
  Bilet,
  Tarc,
  Specie,
  Animal,
  Mancare,
  SeHranesteCu
} from '../../services/zoo-data.service';

type TableType = 'zoo' | 'angajat' | 'studiu' | 'calificare' | 'vizitator' | 'tipBilet' | 'eveniment' | 'planificareEveniment' | 'bilet' | 'tarc' | 'specie' | 'animal' | 'mancare' | 'seHranesteCu';

@Component({
  selector: 'app-oltp-module',
  imports: [CommonModule, FormsModule],
  templateUrl: './oltp-module.component.html',
  styleUrl: './oltp-module.component.scss'
})
export class OltpModuleComponent implements OnInit {
  activeTable: TableType = 'zoo';
  searchTerm = '';
  isEditing = false;
  editingId: number | null = null;
  
  // Cache form fields to prevent infinite loops
  private _cachedFormFields: any[] = [];
  private _lastActiveTable: TableType = 'zoo';

  // Data arrays for all 13 tables
  zoos: Zoo[] = [];
  angajati: Angajat[] = [];
  studii: Studiu[] = [];
  calificari: Calificare[] = [];
  vizitatori: Vizitator[] = [];
  tipBilete: TipBilet[] = [];
  evenimente: Eveniment[] = [];
  planificariEvenimente: PlanificareEveniment[] = [];
  bilete: Bilet[] = [];
  tarcuri: Tarc[] = [];
  specii: Specie[] = [];
  animale: Animal[] = [];
  mancare: Mancare[] = [];
  hranire: SeHranesteCu[] = [];

  // Form objects for all tables
  zooForm: Partial<Zoo> = {};
  angajatForm: Partial<Angajat> = {};
  studiuForm: Partial<Studiu> = {};
  calificareForm: Partial<Calificare> = {};
  vizitatorForm: Partial<Vizitator> = {};
  tipBiletForm: Partial<TipBilet> = {};
  evenimentForm: Partial<Eveniment> = {};
  planificareEvenimentForm: Partial<PlanificareEveniment> = {};
  biletForm: Partial<Bilet> = {};
  tarcForm: Partial<Tarc> = {};
  specieForm: Partial<Specie> = {};
  animalForm: Partial<Animal> = {};
  mancareForm: Partial<Mancare> = {};
  hranireForm: Partial<SeHranesteCu> = {};

  // Table configuration
  tableConfig: Record<TableType, { name: string, icon: string }> = {
    zoo: { name: 'Zoo-uri', icon: '🏢' },
    angajat: { name: 'Angajați', icon: '👥' },
    studiu: { name: 'Studii', icon: '🎓' },
    calificare: { name: 'Calificări', icon: '📜' },
    vizitator: { name: 'Vizitatori', icon: '👨‍👩‍👧‍👦' },
    tipBilet: { name: 'Tipuri Bilete', icon: '🎫' },
    eveniment: { name: 'Evenimente', icon: '🎪' },
    planificareEveniment: { name: 'Planificare Evenimente', icon: '📅' },
    bilet: { name: 'Bilete', icon: '🎟️' },
    tarc: { name: 'Tarcuri', icon: '🏠' },
    specie: { name: 'Specii', icon: '🦁' },
    animal: { name: 'Animale', icon: '🐘' },
    mancare: { name: 'Mâncare', icon: '🥕' },
    seHranesteCu: { name: 'Relații Hrănire', icon: '🍽️' }
  };

  constructor(private zooDataService: ZooDataService) {
  }

  ngOnInit() {
    // Subscribe to all data streams
    this.zooDataService.zoos$.subscribe(data => this.zoos = data);
    this.zooDataService.angajati$.subscribe(data => this.angajati = data);
    this.zooDataService.studii$.subscribe(data => this.studii = data);
    this.zooDataService.calificari$.subscribe(data => this.calificari = data);
    this.zooDataService.vizitatori$.subscribe(data => this.vizitatori = data);
    this.zooDataService.tipBilete$.subscribe(data => this.tipBilete = data);
    this.zooDataService.evenimente$.subscribe(data => this.evenimente = data);
    this.zooDataService.planificariEvenimente$.subscribe(data => this.planificariEvenimente = data);
    this.zooDataService.bilete$.subscribe(data => this.bilete = data);
    this.zooDataService.tarcuri$.subscribe(data => this.tarcuri = data);
    this.zooDataService.specii$.subscribe(data => this.specii = data);
    this.zooDataService.animale$.subscribe(data => this.animale = data);
    this.zooDataService.mancare$.subscribe(data => this.mancare = data);
    this.zooDataService.hranire$.subscribe(data => this.hranire = data);
  }

  getTableKeys(): TableType[] {
    return Object.keys(this.tableConfig) as TableType[];
  }

  setActiveTable(tableKey: TableType): void {
    this.activeTable = tableKey;
    this.cancelEdit(); // Cancel any ongoing edit when switching tables
  }

  getTableColumns(): string[] {
    switch (this.activeTable) {
      case 'zoo':
        return ['id', 'denumire', 'oras'];
      case 'angajat':
        return ['ID', 'Nume', 'Functie', 'Salariu',  'Zoo ID'];
      case 'studiu':
        return ['ID', 'Nume'];
      case 'calificare':
        return ['ID', 'Angajat ID', 'Studiu ID', 'Data Obținerii', 'Notă'];
      case 'vizitator':
        return ['ID', 'Nume', 'Prenume', 'Vârstă', 'Email', 'Telefon', 'Data Înregistrării'];
      case 'tipBilet':
        return ['ID', 'Nume', 'Preț', 'Descriere', 'Discount'];
      case 'eveniment':
        return ['ID', 'Nume', 'Descriere', 'Data', 'Durată', 'Capacitate Maximă', 'Zoo ID'];
      case 'planificareEveniment':
        return ['ID', 'Eveniment ID', 'Angajat ID', 'Rol', 'Data Atribuirii'];
      case 'bilet':
        return ['ID', 'Număr Bilet', 'Data Vânzării', 'Eveniment ID', 'Vizitator ID', 'Tip Bilet ID', 'Preț Final'];
      case 'tarc':
        return ['ID', 'Nume', 'Suprafață', 'Tip Habitat', 'Capacitate Maximă', 'Zoo ID'];
      case 'specie':
        return ['ID', 'Nume', 'Nume Comun', 'Familia', 'Ordinul', 'Clasa', 'Status Conservare'];
      case 'animal':
        return ['ID', 'Nume', 'Vârstă', 'Sex', 'Greutate', 'Data Aducerii', 'Specie ID', 'Tarc ID'];
      case 'mancare':
        return ['ID', 'Nume', 'Tip Mâncare', 'Calorii', 'Preț per Kg', 'Furnizor'];
      case 'seHranesteCu':
        return ['ID', 'Animal ID', 'Mâncare ID', 'Cantitate Zilnică', 'Ora Hrănirii'];
      default:
        return [];
    }
  }

  getFormFields(): any[] {
    // Cache form fields to prevent recalculation
    if (this._lastActiveTable !== this.activeTable) {
      this._lastActiveTable = this.activeTable;
      this._cachedFormFields = this.calculateFormFields();
    }
    return this._cachedFormFields;
  }

  private calculateFormFields(): any[] {
    switch (this.activeTable) {
      case 'zoo':
        return [
          { key: 'denumire', label: 'denumire', type: 'text' },
          { key: 'oras', label: 'oras', type: 'text' },
        ];
      case 'angajat':
        return [
          { key: 'nume', label: 'Nume', type: 'text' },
          { key: 'functie', label: 'Funcție', type: 'text' },
          { key: 'salariu', label: 'Salariu (RON)', type: 'number' },
          { key: 'id_zoo', label: 'Zoo ID', type: 'number' }
        ];
      case 'studiu':
        return [
          { key: 'nume', label: 'Nume', type: 'text' },
        ];
      case 'calificare':
        return [
          { key: 'angajatId', label: 'Angajat ID', type: 'number' },
          { key: 'studiuId', label: 'Studiu ID', type: 'number' },
          { key: 'dataObtinerii', label: 'Data Obținerii', type: 'date' },
          { key: 'nota', label: 'Notă', type: 'number' }
        ];
      case 'vizitator':
        return [
          { key: 'nume', label: 'Nume', type: 'text' },
          { key: 'prenume', label: 'Prenume', type: 'text' },
          { key: 'varsta', label: 'Vârstă', type: 'number' },
          { key: 'email', label: 'Email', type: 'email' },
          { key: 'telefon', label: 'Telefon', type: 'text' },
          { key: 'dataInregistrarii', label: 'Data Înregistrării', type: 'date' }
        ];
      case 'tipBilet':
        return [
          { key: 'nume', label: 'Nume', type: 'text' },
          { key: 'pret', label: 'Preț (RON)', type: 'number' },
          { key: 'descriere', label: 'Descriere', type: 'textarea' },
          { key: 'discount', label: 'Discount (%)', type: 'number' }
        ];
      case 'eveniment':
        return [
          { key: 'nume', label: 'Nume', type: 'text' },
          { key: 'descriere', label: 'Descriere', type: 'textarea' },
          { key: 'data', label: 'Data', type: 'date' },
          { key: 'durata', label: 'Durată (minute)', type: 'number' },
          { key: 'capacitateMaxima', label: 'Capacitate Maximă', type: 'number' },
          { key: 'zooId', label: 'Zoo ID', type: 'number' }
        ];
      case 'planificareEveniment':
        return [
          { key: 'evenimentId', label: 'Eveniment ID', type: 'number' },
          { key: 'angajatId', label: 'Angajat ID', type: 'number' },
          { key: 'rol', label: 'Rol', type: 'text' },
          { key: 'dataAtribuirii', label: 'Data Atribuirii', type: 'date' }
        ];
      case 'bilet':
        return [
          { key: 'numarBilet', label: 'Număr Bilet', type: 'text' },
          { key: 'dataVanzarii', label: 'Data Vânzării', type: 'date' },
          { key: 'evenimentId', label: 'Eveniment ID', type: 'number' },
          { key: 'vizitatorId', label: 'Vizitator ID', type: 'number' },
          { key: 'tipBiletId', label: 'Tip Bilet ID', type: 'number' },
          { key: 'pretFinal', label: 'Preț Final (RON)', type: 'number' }
        ];
      case 'tarc':
        return [
          { key: 'nume', label: 'Nume', type: 'text' },
          { key: 'suprafata', label: 'Suprafață (m²)', type: 'number' },
          { key: 'tipHabitat', label: 'Tip Habitat', type: 'text' },
          { key: 'capacitateMaxima', label: 'Capacitate Maximă', type: 'number' },
          { key: 'zooId', label: 'Zoo ID', type: 'number' }
        ];
      case 'specie':
        return [
          { key: 'nume', label: 'Nume Științific', type: 'text' },
          { key: 'numeComun', label: 'Nume Comun', type: 'text' },
          { key: 'familia', label: 'Familia', type: 'text' },
          { key: 'ordinul', label: 'Ordinul', type: 'text' },
          { key: 'clasa', label: 'Clasa', type: 'text' },
          { key: 'statusConservare', label: 'Status Conservare', type: 'text' }
        ];
      case 'animal':
        return [
          { key: 'nume', label: 'Nume', type: 'text' },
          { key: 'specie', label: 'Specie', type: 'text' },
          { key: 'varsta', label: 'Vârstă', type: 'number' },
          { key: 'greutate', label: 'Greutate (kg)', type: 'number' },
          { key: 'data_sosire', label: 'Data Sosirii', type: 'date' },
          { key: 'zoo_id', label: 'Zoo ID', type: 'number' }
        ];
      case 'mancare':
        return [
          { key: 'nume', label: 'Nume', type: 'text' },
          { key: 'tipMancare', label: 'Tip Mâncare', type: 'text' },
          { key: 'calorii', label: 'Calorii', type: 'number' },
          { key: 'pretPerKg', label: 'Preț per Kg (RON)', type: 'number' },
          { key: 'furnizor', label: 'Furnizor', type: 'text' }
        ];
      case 'seHranesteCu':
        return [
          { key: 'animalId', label: 'Animal ID', type: 'number' },
          { key: 'mancareId', label: 'Mâncare ID', type: 'number' },
          { key: 'cantitateZilnica', label: 'Cantitate Zilnică (kg)', type: 'number' },
          { key: 'oraHranirii', label: 'Ora Hrănirii', type: 'time' }
        ];
      default:
        return [];
    }
  }

  // CRUD Operations
  startAdd(): void {
    this.isEditing = true;
    this.editingId = null;
    this.resetCurrentForm();
  }

  startEdit(item: any): void {
    this.isEditing = true;
    this.editingId = item.id;
    this.populateCurrentForm(item);
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingId = null;
    this.resetCurrentForm();
  }

  saveItem(): void {
    const formData = this.getCurrentForm();
    debugger;
    if (this.editingId) {
      // Update existing item
      const updatedItem = { ...formData, id: this.editingId };
      this.updateItemInService(updatedItem);
    } else {
      // Add new item
      const newItem = { ...formData, id: this.generateNewId() };
      this.addItemToService(newItem);
    }
    
    this.cancelEdit();
  }

  deleteItem(id: number): void {
    if (confirm('Sunteți sigur că doriți să ștergeți această înregistrare?')) {
      debugger;
      this.deleteItemFromService(id);
    }
  }

  // Helper methods
  getCurrentForm(): any {
    switch (this.activeTable) {
      case 'zoo': return this.zooForm;
      case 'angajat': return this.angajatForm;
      case 'studiu': return this.studiuForm;
      case 'calificare': return this.calificareForm;
      case 'vizitator': return this.vizitatorForm;
      case 'tipBilet': return this.tipBiletForm;
      case 'eveniment': return this.evenimentForm;
      case 'planificareEveniment': return this.planificareEvenimentForm;
      case 'bilet': return this.biletForm;
      case 'tarc': return this.tarcForm;
      case 'specie': return this.specieForm;
      case 'animal': return this.animalForm;
      case 'mancare': return this.mancareForm;
      case 'seHranesteCu': return this.hranireForm;
      default: return {};
    }
  }

  resetCurrentForm(): void {
    switch (this.activeTable) {
      case 'zoo': this.zooForm = {}; break;
      case 'angajat': this.angajatForm = {}; break;
      case 'studiu': this.studiuForm = {}; break;
      case 'calificare': this.calificareForm = {}; break;
      case 'vizitator': this.vizitatorForm = {}; break;
      case 'tipBilet': this.tipBiletForm = {}; break;
      case 'eveniment': this.evenimentForm = {}; break;
      case 'planificareEveniment': this.planificareEvenimentForm = {}; break;
      case 'bilet': this.biletForm = {}; break;
      case 'tarc': this.tarcForm = {}; break;
      case 'specie': this.specieForm = {}; break;
      case 'animal': this.animalForm = {}; break;
      case 'mancare': this.mancareForm = {}; break;
      case 'seHranesteCu': this.hranireForm = {}; break;
    }
  }

  populateCurrentForm(item: any): void {
    switch (this.activeTable) {
      case 'zoo': this.zooForm = { ...item }; break;
      case 'angajat': this.angajatForm = { ...item }; break;
      case 'studiu': this.studiuForm = { ...item }; break;
      case 'calificare': this.calificareForm = { ...item }; break;
      case 'vizitator': this.vizitatorForm = { ...item }; break;
      case 'tipBilet': this.tipBiletForm = { ...item }; break;
      case 'eveniment': this.evenimentForm = { ...item }; break;
      case 'planificareEveniment': this.planificareEvenimentForm = { ...item }; break;
      case 'bilet': this.biletForm = { ...item }; break;
      case 'tarc': this.tarcForm = { ...item }; break;
      case 'specie': this.specieForm = { ...item }; break;
      case 'animal': this.animalForm = { ...item }; break;
      case 'mancare': this.mancareForm = { ...item }; break;
      case 'seHranesteCu': this.hranireForm = { ...item }; break;
    }
  }

  generateNewId(): number {
    const currentData = this.getCurrentData();
    return currentData.length > 0 ? Math.max(...currentData.map(item => item.id)) + 1 : 1;
  }

  addItemToService(item: any): void {
    switch (this.activeTable) {
      case 'zoo': this.zooDataService.addZoo(item as Zoo); break;
      case 'angajat': this.zooDataService.addAngajat(item as Angajat); break;
      case 'studiu': this.zooDataService.addStudiu(item as Studiu); break;
      case 'calificare': this.zooDataService.addCalificare(item as Calificare); break;
      case 'vizitator': this.zooDataService.addVizitator(item as Vizitator); break;
      case 'tipBilet': this.zooDataService.addTipBilet(item as TipBilet); break;
      case 'eveniment': this.zooDataService.addEveniment(item as Eveniment); break;
      case 'planificareEveniment': this.zooDataService.addPlanificareEveniment(item as PlanificareEveniment); break;
      case 'bilet': this.zooDataService.addBilet(item as Bilet); break;
      case 'tarc': this.zooDataService.addTarc(item as Tarc); break;
      case 'specie': this.zooDataService.addSpecie(item as Specie); break;
      case 'animal': this.zooDataService.addAnimal(item as Animal); break;
      case 'mancare': this.zooDataService.addMancare(item as Mancare); break;
      case 'seHranesteCu': this.zooDataService.addSeHranesteCu(item as SeHranesteCu); break;
    }
  }

  updateItemInService(item: any): void {
    const { id, ...updateData } = item;
    switch (this.activeTable) {
      case 'zoo': this.zooDataService.updateZoo(id, updateData); break;
      case 'angajat': this.zooDataService.updateAngajat(id, updateData); break;
      case 'studiu': this.zooDataService.updateStudiu(id, updateData); break;
      case 'calificare': this.zooDataService.updateCalificare(id, updateData); break;
      case 'vizitator': this.zooDataService.updateVizitator(id, updateData); break;
      case 'tipBilet': this.zooDataService.updateTipBilet(id, updateData); break;
      case 'eveniment': this.zooDataService.updateEveniment(id, updateData); break;
      case 'planificareEveniment': this.zooDataService.updatePlanificareEveniment(id, updateData); break;
      case 'bilet': this.zooDataService.updateBilet(id, updateData); break;
      case 'tarc': this.zooDataService.updateTarc(id, updateData); break;
      case 'specie': this.zooDataService.updateSpecie(id, updateData); break;
      case 'animal': this.zooDataService.updateAnimal(id, updateData); break;
      case 'mancare': this.zooDataService.updateMancare(id, updateData); break;
      case 'seHranesteCu': this.zooDataService.updateSeHranesteCu(id, updateData); break;
    }
  }

  deleteItemFromService(id: number): void {
    switch (this.activeTable) {
      case 'zoo': this.zooDataService.deleteZoo(id); break;
      case 'angajat': this.zooDataService.deleteAngajat(id); break;
      case 'studiu': this.zooDataService.deleteStudiu(id); break;
      case 'calificare': this.zooDataService.deleteCalificare(id); break;
      case 'vizitator': this.zooDataService.deleteVizitator(id); break;
      case 'tipBilet': this.zooDataService.deleteTipBilet(id); break;
      case 'eveniment': this.zooDataService.deleteEveniment(id); break;
      case 'planificareEveniment': this.zooDataService.deletePlanificareEveniment(id); break;
      case 'bilet': this.zooDataService.deleteBilet(id); break;
      case 'tarc': this.zooDataService.deleteTarc(id); break;
      case 'specie': this.zooDataService.deleteSpecie(id); break;
      case 'animal': this.zooDataService.deleteAnimal(id); break;
      case 'mancare': this.zooDataService.deleteMancare(id); break;
      case 'seHranesteCu': this.zooDataService.deleteSeHranesteCu(id); break;
    }
  }

  getCurrentData(): any[] {
    switch (this.activeTable) {
      case 'zoo': return this.zoos;
      case 'angajat': return this.angajati;
      case 'studiu': return this.studii;
      case 'calificare': return this.calificari;
      case 'vizitator': return this.vizitatori;
      case 'tipBilet': return this.tipBilete;
      case 'eveniment': return this.evenimente;
      case 'planificareEveniment': return this.planificariEvenimente;
      case 'bilet': return this.bilete;
      case 'tarc': return this.tarcuri;
      case 'specie': return this.specii;
      case 'animal': return this.animale;
      case 'mancare': return this.mancare;
      case 'seHranesteCu': return this.hranire;
      default: return [];
    }
  }

  getFilteredData(): any[] {
    const data = this.getCurrentData();
    if (!this.searchTerm) {
      return data;
    }
    
    return data.filter(item => 
      Object.values(item).some(value => 
        value?.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }
}
