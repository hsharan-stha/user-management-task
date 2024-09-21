import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {loadUserProfile} from "@/app/store/user-profile/user-profile.actions";
import {BehaviorSubject, debounceTime, delay, distinct, Observable, take} from "rxjs";
import {UserProfile} from "@/app/interface/UserProfile";
import {getUserProfileList} from "@/app/store/user-profile/user-profile.selector";
import {AsyncPipe, NgForOf} from "@angular/common";
import {DataTableComponent} from "@/app/shared/data-table/data-table/data-table.component";
import {ColumnInterface} from "@/app/interface/ColumnInterface";
import {PaginateInterface} from "@/app/interface/PaginateInterface";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-user-profile-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    DataTableComponent
  ],
  templateUrl: './user-profile-list.component.html',
  styleUrl: './user-profile-list.component.css'
})
export class UserProfileListComponent implements OnInit{

  constructor(private store:Store,private router:Router) {
  }


  protected paginateSubject$=new BehaviorSubject<boolean>(true);

  protected paginate:PaginateInterface={
    currentPage:1,
    itemPerPage:10,
    nextPage: (page:number)=>{
      this.paginate.currentPage=page+1;
      this.paginateSubject$.next(true)

      },
    previousPage:(page:number)=>{
        this.paginate.currentPage=page-1;
        this.paginateSubject$.next(true)
      },
    search:{
      value:"",
      key:""
    }

  }

  protected userProfileList$:Observable<UserProfile[] | undefined>;
  protected columns:ColumnInterface[]=[
    {
      header:'Full Name',
      key:'full_name',
      searchable:true,
      cell:(row:UserProfile)=>{
        if(row?.isAdmin){
          return `<div class="cursor-pointer is-admin">${row?.first_name} ${row?.last_name}</div>`
        }
          return `<div class="cursor-pointer">${row?.first_name} ${row?.last_name}</div>`
      },
      handleEvent:(...params)=>{
        switch (true) {
          case params.some(i=>i==='search'):
            this.paginate={...this.paginate,
            search:{
              value:params[0].target.value,
              key:'first_name'
            }
            }
            console.log( this.paginate)
            this.paginateSubject$.next(true)
            break;
          case params.some(i=>i==='click'):
            this.router.navigate([`/admin/user-profile/detail/${params[1].id}`])
            break;
        }
      }
      },
    {
      header:'Department',
      key:'department',
      searchable:true,
      handleEvent:(...params)=>{
        switch (true) {
          case params.some(i=>i==='search'):
            this.paginate={...this.paginate,
              search:{
                value:params[0].target.value,
                key:params[1].key
              }
            }
            console.log( this.paginate)
            this.paginateSubject$.next(true)
            break;
        }
      }
    },
    // {
    //   header:'Action',
    //   key:'action',
    //   className:"text-right",
    //   cell:(row:UserProfile)=>{
    //     return `
    //             <div class="flex gap-2">
    //             <button class="btn btn-primary" data-action="edit">Edit</button>
    //             <button class="btn btn-danger" data-action="delete">delete</button>
    //             </div>`;
    //   },
    //   handleEvent:(row:UserProfile,$event)=>{
    //     console.log(row,$event.target.getAttribute('data-action'))
    //   }
    // }
  ]

  ngOnInit(): void {
    this.paginateSubject$.pipe(
      debounceTime(500),
    ).subscribe(res=>{
      console.log(res);
      this.loadInitialData();
    })
  }

  private loadInitialData(){
    this.store.dispatch(loadUserProfile(this.paginate))
    this.userProfileList$=this.store.select(getUserProfileList)
  }


}
