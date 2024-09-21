import {createReducer, on} from "@ngrx/store";
import {userProfileState} from "@/app/store/user-profile/user-profile.state";
import {
  addUserProfileFail,
  addUserProfileSuccess,
  getByIdUserProfileFail,
  getByIdUserProfileSuccess,
  loadUserProfileFail,
  loadUserProfileSuccess
} from "@/app/store/user-profile/user-profile.actions";


const _UserProfileReducer=createReducer(userProfileState,

  on(loadUserProfileSuccess,(state,action)=>{
    return {
      ...state,
      list:action.list,
      error:""
    }
  }),
on(loadUserProfileFail,(state,action)=>{
  return {
    ...state,
    list:[],
    error:action.error
  }
}),
  on(addUserProfileSuccess,(state,action)=>{
    console.log(action.data)
    return {
      ...state,
      list:undefined,
      data:action.data,
      error:""
    }
  }),
  on(addUserProfileFail,(state,action)=>{
    return {
      ...state,
      list:[],
      data:undefined,
      error:action.error
    }
  }),
  on(getByIdUserProfileSuccess,(state,action)=>{
    return {
      ...state,
      list:undefined,
      getDetail:action.getDetail,
      error:""
    }
  }),
  on(getByIdUserProfileFail,(state,action)=>{
    return {
      ...state,
      list:[],
      data:undefined,
      error:action.error
    }
  })
)
export function UserProfileReducer(state:any,action:any){
return _UserProfileReducer(state,action)
}
