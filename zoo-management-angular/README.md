# 🦁 Zoo Management System - Big Data Analytics Platform

A comprehensive **Big Data Analytics** and **Data Warehouse** management system for zoo operations, built with **Angular 19** and modern web technologies. This project demonstrates a complete data processing pipeline from OLTP operations to business intelligence reporting.

## 🚀 Quick Start Guide

### **Prerequisites**
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **Git** - For cloning the repository

### **Installation & Setup**

1. **Clone the repository:**
```bash
git clone <your-repository-url>
cd zoo-management-angular
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```

4. **Open your browser and navigate to:**
```
http://localhost:4200
```

The application will automatically reload if you change any of the source files.

### **Available Commands**
```bash
npm start          # Start development server (http://localhost:4200)
npm run build      # Build for production
npm test           # Run unit tests
npm run watch      # Build in watch mode
```

## 🏗️ System Architecture Overview

This application simulates a complete **Big Data ecosystem** with three main modules representing different layers of data processing:

### 📊 **OLTP Module (Online Transaction Processing)**
- **Purpose**: Handles real-time operational data management
- **Functionality**: Complete CRUD operations for core entities
- **Tables**: Zoo, Angajat (Employee), Eveniment (Event), Bilet (Ticket)
- **Data Storage**: In-memory simulation using Angular services with RxJS observables

### 🏭 **Data Warehouse Module**
- **Purpose**: Simulates ETL (Extract, Transform, Load) processes
- **Functionality**: Data propagation from OLTP to analytical storage
- **Operations**: ETL Processing, Data Validation, Synchronization
- **Monitoring**: Real-time operation tracking with status logging

### 📈 **Reporting Module**
- **Purpose**: Business intelligence and analytics dashboard
- **Functionality**: Dynamic charts, KPIs, and data visualization
- **Features**: Interactive charts, performance metrics, trend analysis

## 🗄️ Database Architecture & Data Flow

### **Current Implementation: In-Memory Simulation**

The application currently uses **in-memory data storage** to simulate a complete database ecosystem:

```typescript
// Data stored in Angular services using RxJS BehaviorSubjects
private zoosSubject = new BehaviorSubject<Zoo[]>([...initialData]);
private angajatiSubject = new BehaviorSubject<Angajat[]>([...initialData]);
// ... other entities
```

### **Data Flow Simulation**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   OLTP Module   │───▶│ Data Warehouse  │───▶│ Reporting Module│
│   (Frontend)    │    │   ETL Process   │    │   Analytics     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                       │                       │
        ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Operational DB  │    │ Staging Area    │    │  Data Warehouse │
│ (Simulated)     │    │ (Simulated)     │    │   (Simulated)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Entity Relationship Model**

```sql
-- Core Tables (Simulated Schema)
Zoo {
  id: number (PK)
  nume: string
  locatie: string
  suprafata: number
  numarAnimale: number
}

Angajat {
  id: number (PK)
  nume: string
  prenume: string
  pozitie: string
  salariu: number
  dataAngajarii: date
  zooId: number (FK → Zoo.id)
}

Eveniment {
  id: number (PK)
  nume: string
  data: date
  durata: number
  pretBilet: number
  capacitateMaxima: number
  zooId: number (FK → Zoo.id)
}

Bilet {
  id: number (PK)
  tipBilet: string
  pret: number
  dataVanzarii: date
  evenimentId: number (FK → Eveniment.id)
  zooId: number (FK → Zoo.id)
}
```

## 📋 What's Inside This Project

### **Current Implementation Status**
- ✅ **Fully Functional Frontend** - Complete Angular 19 application
- ✅ **In-Memory Data Simulation** - All operations work with mock data
- ✅ **Three Core Modules** - OLTP, Data Warehouse, and Reporting
- ✅ **Real-time UI Updates** - Reactive data flow with RxJS
- ⚠️ **Database Connection** - Currently uses mock data (ready for real DB integration)

### **What You Can Do Right Now**
1. **OLTP Operations**: Add, edit, delete, and search zoo data
2. **ETL Simulation**: Watch data processing workflows
3. **Analytics Dashboard**: View charts and KPIs
4. **Real-time Updates**: See data changes instantly across modules

### **Sample Data Included**
- **4 Zoo Locations** with realistic details
- **12+ Employees** across different positions
- **10+ Events** with schedules and pricing
- **Multiple Ticket Types** and sales data
- **Animals, Species, and Feeding Data**
- **ETL Logs** for monitoring data processes

## 🛠️ Technical Implementation

### **Frontend Architecture**
- **Framework**: Angular 19 with TypeScript
- **Styling**: Tailwind CSS for modern, responsive design
- **Charts**: Chart.js with ng2-charts for data visualization
- **State Management**: RxJS BehaviorSubjects for reactive data flow
- **Forms**: Angular Reactive Forms with validation

### **Data Management**
The application uses a sophisticated service-based architecture:

```typescript
@Injectable({ providedIn: 'root' })
export class ZooDataService {
  // Real-time data streams
  zoos$ = this.zoosSubject.asObservable();
  angajati$ = this.angajatiSubject.asObservable();
  
  // CRUD operations with automatic ETL logging
  addZoo(zoo: Omit<Zoo, 'id'>): void {
    // 1. Add to OLTP storage
    // 2. Generate unique ID
    // 3. Log ETL operation
    // 4. Notify all subscribers
  }
}
```

### **Key Technical Features**
- **Reactive Programming**: All data updates trigger automatic UI refreshes
- **Type Safety**: Full TypeScript implementation with interfaces
- **Component Architecture**: Modular, reusable components
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Performance Optimized**: OnPush change detection strategy

## 🎯 Features Implementation

## 🎯 Modules & Features

### **1. 📊 OLTP Module (Online Transaction Processing)**
**What it does**: Manages day-to-day zoo operations with full CRUD functionality.

**Features**:
- ✅ **Zoo Management**: Add/edit zoo locations, capacity, and details
- ✅ **Employee Management**: Staff records, positions, and salaries
- ✅ **Event Management**: Schedule events, set pricing, manage capacity
- ✅ **Ticket Sales**: Process ticket purchases and track sales
- ✅ **Animal Management**: Track animals, species, and feeding schedules
- ✅ **Real-time Search**: Find records instantly across all tables
- ✅ **Form Validation**: Error handling and data validation

**Try it**: Click on "OLTP Module" → Use the tabs to manage different entities

### **2. 🏭 Data Warehouse Module**
**What it does**: Simulates ETL (Extract, Transform, Load) processes for data analytics.

**Features**:
- ✅ **ETL Process Simulation**: Watch data move through pipeline stages
- ✅ **Progress Tracking**: Real-time status updates with progress bars
- ✅ **Data Validation**: Simulate data quality checks
- ✅ **Synchronization**: Monitor OLTP to warehouse data flow
- ✅ **Operation Logging**: Detailed logs with timestamps and status
- ✅ **Error Simulation**: See how the system handles data issues

**Try it**: Click on "Data Warehouse" → Start ETL processes and watch the progress

### **3. 📈 Reporting Module**
**What it does**: Provides business intelligence and data visualization.

**Features**:
- ✅ **Key Performance Indicators**: Zoo performance metrics
- ✅ **Interactive Charts**: Line, bar, and pie charts with Chart.js
- ✅ **Trend Analysis**: Monthly revenue and visitor trends
- ✅ **Comparative Analytics**: Performance across different zoos
- ✅ **Real-time Data**: Charts update when OLTP data changes
- ✅ **Export Ready**: Charts can be saved or printed

**Try it**: Click on "Reporting Module" → View analytics and interact with charts

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── oltp-module/              # 📊 CRUD operations & data management
│   │   │   ├── oltp-module.component.ts
│   │   │   ├── oltp-module.component.html
│   │   │   └── oltp-module.component.scss
│   │   ├── data-warehouse/           # 🏭 ETL simulation & monitoring
│   │   │   ├── data-warehouse.component.ts
│   │   │   ├── data-warehouse.component.html
│   │   │   └── data-warehouse.component.scss
│   │   └── reporting-module/         # 📈 Analytics & visualization
│   │       ├── reporting-module.component.ts
│   │       ├── reporting-module.component.html
│   │       └── reporting-module.component.scss
│   ├── services/
│   │   └── zoo-data.service.ts       # 🔧 Core data management service
│   ├── app.component.*               # 🏠 Main application shell
│   ├── app.config.ts                 # ⚙️ App configuration
│   └── app.routes.ts                 # 🗺️ Navigation routing
├── styles.scss                       # 🎨 Global styles & Tailwind imports
└── index.html                        # 📄 Entry point
```

### **Key Files Explained**
- **`zoo-data.service.ts`**: The heart of the application - manages all data operations
- **`oltp-module.component.ts`**: Handles CRUD operations for all entities
- **`data-warehouse.component.ts`**: Simulates ETL processes and monitoring
- **`reporting-module.component.ts`**: Generates charts and analytics dashboards

## 🗃️ Data Management

### **Service-Based Architecture**
The `ZooDataService` manages all data operations:

```typescript
@Injectable({ providedIn: 'root' })
export class ZooDataService {
  // Observable data streams
  zoos$ = this.zoosSubject.asObservable();
  angajati$ = this.angajatiSubject.asObservable();
  
  // CRUD operations with ETL logging
  addZoo(zoo: Omit<Zoo, 'id'>): void {
    // Add to OLTP
    // Log ETL operation
    // Trigger data warehouse sync
  }
}
```

### **Real-time Data Synchronization**
- All CRUD operations automatically trigger ETL logs
- Data changes are immediately reflected across all modules
- RxJS observables ensure reactive updates

## 📊 Sample Data & Entities

The application comes pre-loaded with realistic sample data to demonstrate all features:

### **Core Entities**
- **Zoo**: 4 locations (București, Cluj-Napoca, Timișoara, Brașov)
- **Angajat (Employees)**: 12+ staff members with roles, salaries, qualifications
- **Eveniment (Events)**: 10+ events with pricing, schedules, and capacity
- **Bilet (Tickets)**: Multiple ticket types and sales records
- **Animal**: Various species with feeding schedules and care data
- **Tarc (Enclosures)**: Habitat types and animal housing
- **ETL Logs**: Operation tracking and monitoring data

### **Realistic Business Scenarios**
- Zoo staff managing daily operations
- Event planning and ticket sales
- Animal care and feeding schedules
- Financial reporting and analytics
- Data warehouse operations and monitoring

### **Data Relationships**
All entities are properly connected with foreign keys:
- Employees belong to specific zoos
- Events are scheduled at zoo locations  
- Tickets are sold for specific events
- Animals are housed in enclosures at zoos
- ETL logs track all data operations

## 🔮 Next Steps: Database Integration

### **Current State**: In-Memory Simulation
The application currently uses sophisticated in-memory data management that simulates a real database environment. All CRUD operations, ETL processes, and analytics work perfectly with mock data.

### **Ready for Real Database Connection**
The architecture is designed to easily connect to a real database. The transition involves:

1. **Backend API Development** (Node.js/Express recommended)
2. **Database Setup** (PostgreSQL/MySQL/SQL Server)
3. **HTTP Service Integration** (Replace mock data with API calls)
4. **ETL Pipeline Implementation** (Real data warehouse processes)

### **Recommended Production Architecture**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Angular Frontend│───▶│  Node.js API    │───▶│  PostgreSQL DB  │
│  (Current App)  │    │  (To be built)  │    │  (To be setup)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Integration Guide**
When ready to connect to a real database, you'll need to:
- Replace `ZooDataService` methods with HTTP calls
- Set up API endpoints for CRUD operations
- Implement real ETL processes
- Configure database connections

**The current application provides the perfect foundation for this transition!**

## 🚀 Development Commands

| Command | Description | When to Use |
|---------|-------------|-------------|
| `npm start` | Start development server on http://localhost:4200 | Main development command |
| `npm run build` | Build for production | Before deployment |
| `npm test` | Run unit tests with Karma | Testing components |
| `npm run watch` | Build in watch mode | Continuous development |
| `ng generate component <name>` | Create new component | Adding features |
| `ng serve --open` | Start server and open browser | Quick startup |

### **Development Workflow**
1. Run `npm start` to start the development server
2. Open http://localhost:4200 in your browser
3. Make changes to the code - the app will automatically reload
4. Test your changes in all three modules
5. Run `npm test` to ensure tests pass

## 🎨 User Interface Features

- **🎨 Modern Design** with professional Tailwind CSS styling
- **📱 Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- **🌙 Professional Color Scheme** with consistent branding
- **⚡ Smooth Animations** and intuitive transitions
- **🔍 Real-time Search** across all data tables
- **📊 Interactive Charts** with hover effects and tooltips
- **🚀 Fast Performance** optimized for large datasets
- **♿ Accessible Design** following web accessibility guidelines

## 🎓 Educational Value

This project demonstrates mastery of:

### **Big Data Concepts**
- **OLTP vs OLAP Systems**: Understanding operational vs analytical databases
- **ETL Processes**: Extract, Transform, Load data pipeline simulation
- **Data Warehouse Architecture**: Staging areas and analytical storage
- **Business Intelligence**: KPIs, dashboards, and reporting

### **Modern Web Development**
- **Angular 19**: Latest framework features and best practices
- **TypeScript**: Type-safe development and interfaces
- **Reactive Programming**: RxJS observables and data streams
- **Component Architecture**: Modular, maintainable code structure

### **Software Engineering**
- **Clean Code**: Well-organized, documented, and testable code
- **Design Patterns**: Service layer, dependency injection
- **Responsive Design**: Mobile-first development approach
- **Performance Optimization**: Change detection strategies

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Angular 19 + Tailwind CSS + Chart.js**
