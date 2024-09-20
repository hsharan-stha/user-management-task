import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {CredentialInfo} from "@/app/interface/CredentialInfo";
import {LoginPayload} from "@/app/interface/LoginPayload";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userConfigUrl:string=`/assets/config/user.json`

  constructor(private httpClient:HttpClient) { }

  public login(data:LoginPayload):Observable<CredentialInfo[]>{
    return this.httpClient.get<CredentialInfo[]>(this.userConfigUrl).pipe(
     map((users:Array<CredentialInfo>)=>
        users.filter(i=>i.username===data?.username && i.password === data?.password)
     )
    )
  }

}
