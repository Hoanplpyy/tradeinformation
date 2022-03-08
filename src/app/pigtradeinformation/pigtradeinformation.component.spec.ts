import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PigtradeinformationComponent } from './pigtradeinformation.component';

describe('PigtradeinformationComponent', () => {
  let component: PigtradeinformationComponent;
  let fixture: ComponentFixture<PigtradeinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PigtradeinformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PigtradeinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
