import {createAction, props} from "@ngrx/store";
import {UserProfile} from "@/app/interface/UserProfile";

export const LOAD_USER_PROFILE="[User Profile] load user profile";
export const LOAD_USER_PROFILE_SUCCESS="[User Profile] load user profile success";
export const LOAD_USER_PROFILE_FAIL="[User Profile] load user profile fail";

export const loadUserProfile=createAction(LOAD_USER_PROFILE,props<{currentPage:number,itemPerPage:number,search?:{value:string,key:string}}>())
export const loadUserProfileSuccess=createAction(LOAD_USER_PROFILE_SUCCESS,props<{list:UserProfile[]}>())
export const loadUserProfileFail=createAction(LOAD_USER_PROFILE_FAIL,props<{error:string}>())


export const ADD_USER_PROFILE="[User Profile] as user profile"
export const ADD_USER_PROFILE_SUCCESS="[User Profile] as user profile success"
export const ADD_USER_PROFILE_FAIL="[User Profile] as user profile fail"
export const addUserProfile=createAction(ADD_USER_PROFILE,props<{payload:UserProfile}>())
export const addUserProfileSuccess=createAction(ADD_USER_PROFILE_SUCCESS,props<{data:UserProfile}>())
export const addUserProfileFail=createAction(ADD_USER_PROFILE_FAIL,props<{error:string}>())
