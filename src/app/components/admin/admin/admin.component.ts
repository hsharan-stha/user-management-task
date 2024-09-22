import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {AuthService} from "@/app/service/auth/auth.service";
import {NgOptimizedImage} from "@angular/common";
import {CredentialInfo} from "@/app/interface/CredentialInfo";
import {SidebarComponent} from "@/app/shared/sidebar/sidebar.component";
import {SideBar} from "@/app/interface/SideBar";
import {TopBarComponent} from "@/app/shared/top-bar/top-bar.component";
import {faAdd, faHome} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgOptimizedImage,
    RouterLinkActive,
    SidebarComponent,
    TopBarComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{


  public userDetails:CredentialInfo | undefined;

  public sideBarList:SideBar[]=[
    {
      label:"User Profile List",
      icon:faHome,
      url:"/admin/user-profile-list"
    },
    {
      label:"Create User Profile",
      icon:faAdd,
      url:"/admin/user-profile"
    }
  ]

  constructor(private authService:AuthService) {
  }

  ngOnInit(): void {
    this.userDetails=this.authService.getUserDetails();
  }

  public async logout():Promise<void>{
    await this.authService.logout();
  }



}
