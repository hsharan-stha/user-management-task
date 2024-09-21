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
import {combineLatest, take} from "rxjs";
import {ToastService} from "@/app/shared/toast/service/toast.service";
import {faClose, faSave} from "@fortawesome/free-solid-svg-icons";

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

  constructor(private formBuilder: FormBuilder,
              private store: Store,
              private confirmService:ConfirmService,
              private toastService:ToastService,
              private router: Router) {
    super();
    this.userProfileForm = this.formBuilder.group({
      // id: [""],
      first_name: ["", [Validators.required, Validators.minLength(3)]],
      last_name: ["", [Validators.required, Validators.minLength(3)]],
      username: ["", [Validators.required, userNameValidator()]],
      isAdmin:[false],
      department:["",Validators.required]
    })
  }

  ngOnInit(): void {
   this.loadSuccessErrorHandler()
  }

  protected saveUser(){

    if (this.userProfileForm.invalid) {
      this.validateAllFormFields(this.userProfileForm)
      return;
    }

    this.confirmService.confirm(
      'Are you sure you want to proceed?',
      'Please confirm whether you want to continue or cancel the process.')
      .pipe(take(1))
      .subscribe((confirmed)=>{
        if(confirmed) {
          this.store.dispatch(addUserProfile({payload: {...this.userProfileForm.value}}))
        }
      })

  }

  private loadSuccessErrorHandler(){
    combineLatest([
      this.store.select(getSaveResponse),
      this.store.select(getUserProfileError)
    ]).subscribe(([success,error])=>{
      if(success){
        this.toastService.show("Date Save Successfully", faSave);
      }
      if(error){
        this.toastService.show("Date Save Failed", faClose);
      }
    })
  }

  ngOnDestroy(): void {

  }



}
