import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingModuleComponent } from './reporting-module.component';

describe('ReportingModuleComponent', () => {
  let component: ReportingModuleComponent;
  let fixture: ComponentFixture<ReportingModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportingModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportingModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
