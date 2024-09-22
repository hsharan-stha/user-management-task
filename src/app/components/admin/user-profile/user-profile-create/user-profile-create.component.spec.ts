import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileCreateComponent } from './user-profile-create.component';
import {MockStore} from "@ngrx/store/testing";
import {provideStore} from "@ngrx/store";

describe('UserProfileCreateComponent', () => {
  let component: UserProfileCreateComponent;
  let fixture: ComponentFixture<UserProfileCreateComponent>;
  let store:MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileCreateComponent],
      providers:[
        provideStore()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
