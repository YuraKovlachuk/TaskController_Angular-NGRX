import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBoardModalComponent } from './info-board-modal.component';

describe('InfoBoardModalComponent', () => {
  let component: InfoBoardModalComponent;
  let fixture: ComponentFixture<InfoBoardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoBoardModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoBoardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
