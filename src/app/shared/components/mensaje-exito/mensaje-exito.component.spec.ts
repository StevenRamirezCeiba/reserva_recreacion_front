import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeExitoComponent } from './mensaje-exito.component';

describe('MensajeExitoComponent', () => {
  let component: MensajeExitoComponent;
  let fixture: ComponentFixture<MensajeExitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeExitoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeExitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
