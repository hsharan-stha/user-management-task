import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserProfile} from "@/app/interface/UserProfile";
import {map} from "rxjs";
import {Store} from "@ngrx/store";
import {getByIdUserProfile} from "@/app/store/user-profile/user-profile.actions";
import {getUserProfileDetail} from "@/app/store/user-profile/user-profile.selector";

@Component({
  selector: 'app-user-profile-view',
  standalone: true,
  imports: [],
  templateUrl: './user-profile-view.component.html',
  styleUrl: './user-profile-view.component.css'
})
export class UserProfileViewComponent implements OnInit{

  protected details:UserProfile | undefined;

  constructor(private router:Router,
              private store:Store,
              private activateRoute:ActivatedRoute) {
    this.activateRoute.params
      .pipe(
        map(_param=>{
          return this.store.dispatch(getByIdUserProfile({id:_param['id']}))
        })
      )
      .subscribe()
  }

  ngOnInit(): void {
    this.store.select(getUserProfileDetail).subscribe(res=>{
      this.details=res
    })
  }



}
