import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataWarehouseComponent } from './data-warehouse.component';

describe('DataWarehouseComponent', () => {
  let component: DataWarehouseComponent;
  let fixture: ComponentFixture<DataWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataWarehouseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
