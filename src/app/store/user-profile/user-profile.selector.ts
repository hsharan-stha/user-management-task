import {createFeatureSelector, createSelector} from "@ngrx/store";
import {UserProfileResponse} from "@/app/interface/UserProfile";

const getUserProfileState=createFeatureSelector<UserProfileResponse>('userProfile');
export const getUserProfileList=createSelector(
  getUserProfileState,(state)=>{
    return state.list
  }
)
export const getSaveResponse=createSelector(
  getUserProfileState,(state)=>{
    console.log(state)
    return state.data
  }
)

export const getUserProfileError=createSelector(
  getUserProfileState,(state)=>{
    return state.error
  }
)
