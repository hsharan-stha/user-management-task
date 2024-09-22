import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserProfileViewComponent} from './user-profile-view.component';
import {provideStore} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";

describe('UserProfileViewComponent', () => {
  let component: UserProfileViewComponent;
  let fixture: ComponentFixture<UserProfileViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileViewComponent],
      providers:[
        provideStore(),
        {
          provide:ActivatedRoute,
          useValue:{
            snapshot:{paramMap:{get:()=>'1'}},
            params:of({id:'123'})
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
