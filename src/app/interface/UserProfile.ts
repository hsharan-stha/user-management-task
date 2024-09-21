export interface UserProfile{
  id:number,
  first_name:string,
  last_name:string,
  username:string,
  isAdmin:boolean,
  department:string
}


export interface UserProfileResponse{
  list:UserProfile[] | undefined ,
  data:UserProfile | undefined,
  getDetail:UserProfile | undefined,
  error:string
}

