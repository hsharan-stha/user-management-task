import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormValidateMark} from "@/app/utils/FormValidateMark";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {userNameValidator} from "@/app/validators/userNameValidator";
import {NgForOf, NgIf} from "@angular/common";
import {DepartmentOptions} from "@/app/shared/enum/department-type";
import {ConfirmService} from "@/app/shared/confirm/service/confirm.service";
import {Store} from "@ngrx/store";
import {addUserProfile,} from "@/app/store/user-profile/user-profile.actions";
import {getSaveResponse, getUserProfileError} from "@/app/store/user-profile/user-profile.selector";
import {combineLatest, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-user-profile-create',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './user-profile-create.component.html',
  styleUrl: './user-profile-create.component.css'
})
export class UserProfileCreateComponent extends FormValidateMark implements OnInit,OnDestroy {

  protected readonly userProfileForm:FormGroup;
  protected readonly DepartmentOptions = DepartmentOptions;

  private unSubscribe$=new Subject<void>();

  constructor(private formBuilder: FormBuilder,
              private store: Store,
              private confirmService:ConfirmService,
              private router: Router) {
    super();
    this.userProfileForm = this.formBuilder.group({
      id: [""],
      first_name: ["", [Validators.required, Validators.minLength(3)]],
      last_name: ["", [Validators.required, Validators.minLength(3)]],
      username: ["", [Validators.required, userNameValidator()]],
      isAdmin:[false],
      department:["",Validators.required]
    })
  }

  ngOnInit(): void {
  }

  protected saveUser(){
    if (this.userProfileForm.invalid) {
      this.validateAllFormFields(this.userProfileForm)
      return;
    }
    this.store.dispatch(addUserProfile({payload:this.userProfileForm.value}))

    combineLatest([
      this.store.select(getSaveResponse),
      this.store.select(getUserProfileError)
    ]).pipe(
      takeUntil(this.unSubscribe$)
    ).subscribe(([success,error])=>{
      if(success){
        alert("success")
      }

      if(error){
        alert(error)
      }
    })
  }

  protected async navigateToList(): Promise<void> {
    await this.router.navigateByUrl("/admin/user-profile-list")
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next();
    this.unSubscribe$.complete();
  }



}
