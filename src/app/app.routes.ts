import {Routes} from '@angular/router';
import {AdminComponent} from "./components/admin/admin/admin.component";
import {authGuard} from "./guard/auth.guard";
import {LoginComponent} from "./components/home/login/login.component";
import {
  UserProfileCreateComponent
} from "@/app/components/admin/user-profile/user-profile-create/user-profile-create.component";
import {
  UserProfileListComponent
} from "@/app/components/admin/user-profile/user-profile-list/user-profile-list.component";
import {
  UserProfileViewComponent
} from "@/app/components/admin/user-profile/user-profile-view/user-profile-view.component";

export const routes: Routes = [
    {
    path:"admin",
    loadComponent:()=>import("./components/admin/admin/admin.component")
      .then(()=>AdminComponent),
    children:[
      {
        path:"user-profile",
        loadComponent:()=>import("./components/admin/user-profile/user-profile-create/user-profile-create.component")
          .then(()=>UserProfileCreateComponent),
      },
      {
        path:"user-profile-list",
        loadComponent:()=>import("./components/admin/user-profile/user-profile-list/user-profile-list.component")
          .then(()=>UserProfileListComponent),
      },{
        path:"user-profile/detail/:id",
        loadComponent:()=>import("./components/admin/user-profile/user-profile-view/user-profile-view.component")
          .then(()=>UserProfileViewComponent),
      },
      {path:"**",redirectTo:"user-profile-list"}
    ],
    // canActivate:[authGuard]
  },
    {
      path:"login",
      loadComponent:()=>import("./components/home/login/login.component")
        .then(()=>LoginComponent),
    },
    {path:"**",redirectTo:"login"}

];
