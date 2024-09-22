import {Component, OnInit} from '@angular/core';
import {LoginService} from "@/app/service/login/login.service";
import {AuthService} from "@/app/service/auth/auth.service";
import {Router} from "@angular/router";
import {CredentialInfo} from "@/app/interface/CredentialInfo";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginPayload} from "@/app/interface/LoginPayload";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {FormValidateMark} from "@/app/utils/FormValidateMark";
import {ToastService} from "@/app/shared/toast/service/toast.service";
import {faInfo} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent extends FormValidateMark implements OnInit {


  public loginForm: FormGroup;

  constructor(private loginService: LoginService,
              private authService: AuthService,
              private router: Router,
              private toastService:ToastService,
              private formBuilder: FormBuilder) {
    super();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  ngOnInit(): void {
  }


  public login(): void {
    if(this.loginForm.invalid){
    this.validateAllFormFields(this.loginForm);
      return;
    }
    const loginData: LoginPayload = this.loginForm.value;
    this.loginService.login(loginData)
      .subscribe(async res => {
        const loggedInDetail: CredentialInfo = res[0];
        if (res?.length === 0) {
          this.toastService.show("please enter valid username and password",faInfo)
          return;
        }
        this.authService.setLocalStorage(loggedInDetail)
        if (loggedInDetail?.role === 'Admin') {
          await this.router.navigateByUrl("/admin")
        } else {
          await this.router.navigateByUrl("/login")
        }
      })
  }


}
