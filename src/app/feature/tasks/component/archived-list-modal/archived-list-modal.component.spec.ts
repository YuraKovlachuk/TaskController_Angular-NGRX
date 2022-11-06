import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedListModalComponent } from './archived-list-modal.component';

describe('ArchivedListModalComponent', () => {
  let component: ArchivedListModalComponent;
  let fixture: ComponentFixture<ArchivedListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedListModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivedListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
