import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormFooterComponent } from './user-form-footer.component';

describe('UserFormFooterComponent', () => {
  let component: UserFormFooterComponent;
  let fixture: ComponentFixture<UserFormFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormFooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormFooterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
