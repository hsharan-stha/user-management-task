import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "@/environments/environment";
import {CredentialInfo} from "@/app/interface/CredentialInfo";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userDetails: CredentialInfo | undefined;

  constructor(private router:Router) { }

  public setLocalStorage(data:CredentialInfo):void{
    const dataS={...data};
    Object.defineProperty(dataS,'password',{enumerable:false})
    localStorage.setItem(environment.accessKey,JSON.stringify(dataS));
  }


  public isAdmin():boolean{
    return this.getUserDetails()?.role===environment.adminKey;
  }

  public getUserDetails():CredentialInfo{
    const accessDetails:string | null= localStorage.getItem(environment.accessKey);
    if(accessDetails){
      this.userDetails = JSON.parse(accessDetails)
    }
    return this.userDetails as CredentialInfo;
  }

  public async logout():Promise<void>{
    localStorage.clear();
    await this.router.navigateByUrl("/login")
  }
}
