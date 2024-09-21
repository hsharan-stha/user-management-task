import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {SideBar} from "../../interface/SideBar";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faSignOut} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    NgForOf,
    NgIf,
    FaIconComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @HostBinding("class.app-sidebar") className="app-sidebar";

  @Output() public logoutEvent:EventEmitter<boolean>=new EventEmitter<boolean>;

  @Input() public sideBarList:SideBar[]=[];
  @Input() public username:string | undefined;


  public logout(){
      this.logoutEvent.emit(true);
  }

  protected readonly faSignOut = faSignOut;
}
