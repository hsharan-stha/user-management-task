import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UserProfileService} from "@/app/service/user-profile/user-profile.service";
import {
  addUserProfile, addUserProfileFail, addUserProfileSuccess,
  loadUserProfile,
  loadUserProfileFail,
  loadUserProfileSuccess
} from "@/app/store/user-profile/user-profile.actions";
import {catchError, exhaustMap, map, of, switchMap} from "rxjs";

@Injectable()
export class UserProfileEffects{
  constructor(private actions$:Actions,
              private userProfileService:UserProfileService) {
  }


  _loadUserProfile$=createEffect(()=>
  this.actions$.pipe(
    ofType(loadUserProfile),
    exhaustMap((action)=>{
      return this.userProfileService.findPaginatedAll(
        action.currentPage,
        action.itemPerPage,
        action.search
      ).pipe(
        map((data)=>{
          return loadUserProfileSuccess({list:data})
        }),
        catchError((err)=>{
          return of(loadUserProfileFail({error:err.message}))
        })
      )
    })
  )
  )

  _addUserProfile$=createEffect(()=>
  this.actions$.pipe(
    ofType(addUserProfile),
    switchMap((action)=>{
      return this.userProfileService.save(action.payload).pipe(
        map((data)=>{
          return addUserProfileSuccess({data})
        }),
        catchError((err)=>of(addUserProfileFail({error:err.message})))
      )
    })
  )
  )

}
