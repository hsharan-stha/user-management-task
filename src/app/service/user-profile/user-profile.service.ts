import {Injectable} from '@angular/core';
import {environment} from "@/environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserProfile} from "@/app/interface/UserProfile";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private userProfileEndPoint:string=`${environment.apiUrl}user`

  constructor(private httpClient:HttpClient) { }

  public findAll():Observable<Array<UserProfile>>{
    return this.httpClient.get<Array<UserProfile>>(this.userProfileEndPoint)
  }

  public save(data:UserProfile):Observable<UserProfile>{
    return this.httpClient.post<UserProfile>(this.userProfileEndPoint,data);
  }



}
