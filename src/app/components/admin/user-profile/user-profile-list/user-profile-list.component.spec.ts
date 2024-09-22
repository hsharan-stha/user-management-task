import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserProfileListComponent} from './user-profile-list.component';
import {provideStore} from "@ngrx/store";

describe('UserProfileListComponent', () => {
  let component: UserProfileListComponent;
  let fixture: ComponentFixture<UserProfileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileListComponent],
      providers:[
        provideStore()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
