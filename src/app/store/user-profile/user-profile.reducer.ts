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
      data:undefined,
      getDetail:undefined,
      error:""
    }
  }),
on(loadUserProfileFail,(state,action)=>{
  return {
    ...state,
    list:[],
    data:undefined,
    getDetail:undefined,
    error:action.error
  }
}),
  on(addUserProfileSuccess,(state,action)=>{
    console.log(action.data)
    return {
      ...state,
      list:undefined,
      data:action.data,
      getDetail:undefined,
      error:""
    }
  }),
  on(addUserProfileFail,(state,action)=>{
    return {
      ...state,
      list:[],
      data:undefined,
      getDetail:undefined,
      error:action.error
    }
  }),
  on(getByIdUserProfileSuccess,(state,action)=>{
    return {
      ...state,
      list:undefined,
      data:undefined,
      getDetail:action.getDetail,
      error:""
    }
  }),
  on(getByIdUserProfileFail,(state,action)=>{
    return {
      ...state,
      list:[],
      data:undefined,
      getDetail:undefined,
      error:action.error
    }
  })
)

// eslint-disable-next-line
export function UserProfileReducer(state:any,action:any){
return _UserProfileReducer(state,action)
}
