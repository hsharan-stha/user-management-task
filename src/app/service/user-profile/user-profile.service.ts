import {Injectable} from '@angular/core';
import {environment} from "@/environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserProfile} from "@/app/interface/UserProfile";
import {delay, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private userProfileEndPoint=`${environment.apiUrl}user`

  constructor(private httpClient:HttpClient) { }

  public findAll():Observable<UserProfile[]>{
    return this.httpClient.get<UserProfile[]>(this.userProfileEndPoint)
  }

  public findPaginatedAll(currentPage:number,itemPerPage:number,search?:{value:string,key:string}):Observable<UserProfile[]>{
    const start=(currentPage - 1) * itemPerPage;
    const end=start + itemPerPage;

    return this.httpClient.get<UserProfile[]>(this.userProfileEndPoint).pipe(
      delay(500),
      map(res=>{
        if(search && search?.key && search?.value) {
          // eslint-disable-next-line
         return res.filter((i:any) => i[search.key].toUpperCase().includes(search.value.toUpperCase()))
        }
        return res;
      }),
      map(res=>res.slice(start,end))
    )
  }

  public save(data:UserProfile):Observable<UserProfile>{
    return this.httpClient.post<UserProfile>(this.userProfileEndPoint,data);
  }

  public getById(id:number):Observable<UserProfile>{
    return this.httpClient.get<UserProfile>(`${this.userProfileEndPoint}/${id}`);
  }



}
