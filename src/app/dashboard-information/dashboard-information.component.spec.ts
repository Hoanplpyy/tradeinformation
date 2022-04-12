import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInformationComponent } from './dashboard-information.component';

describe('DashboardInformationComponent', () => {
  let component: DashboardInformationComponent;
  let fixture: ComponentFixture<DashboardInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
