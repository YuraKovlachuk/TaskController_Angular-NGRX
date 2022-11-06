import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTaskModalComponent } from './info-task-modal.component';

describe('InfoTaskModalComponent', () => {
  let component: InfoTaskModalComponent;
  let fixture: ComponentFixture<InfoTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoTaskModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
