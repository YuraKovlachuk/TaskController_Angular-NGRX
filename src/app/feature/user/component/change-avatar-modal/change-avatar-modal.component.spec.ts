import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAvatarModalComponent } from './change-avatar-modal.component';

describe('ChangeAvatarModalComponent', () => {
  let component: ChangeAvatarModalComponent;
  let fixture: ComponentFixture<ChangeAvatarModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeAvatarModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeAvatarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
