import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {loadUserProfile} from "@/app/store/user-profile/user-profile.actions";
import {Observable} from "rxjs";
import {UserProfile} from "@/app/interface/UserProfile";
import {getUserProfileList} from "@/app/store/user-profile/user-profile.selector";
import {AsyncPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-user-profile-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './user-profile-list.component.html',
  styleUrl: './user-profile-list.component.css'
})
export class UserProfileListComponent implements OnInit{

  protected userProfileList$:Observable<UserProfile[] | undefined>;

  constructor(private store:Store) {
  }
  ngOnInit(): void {
    this.loadInitialData();
  }

  private loadInitialData(){
    this.store.dispatch(loadUserProfile())
    this.userProfileList$=this.store.select(getUserProfileList)
  }

}
