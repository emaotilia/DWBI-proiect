import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OltpModuleComponent } from './oltp-module.component';

describe('OltpModuleComponent', () => {
  let component: OltpModuleComponent;
  let fixture: ComponentFixture<OltpModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OltpModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OltpModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
