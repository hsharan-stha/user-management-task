import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    NgIf,
    FaIconComponent
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {

  @Input() public username:string | undefined ="";

  @Output() public loginEvent:EventEmitter<boolean> = new EventEmitter<boolean>();

  public loginFn():void{
    this.loginEvent.emit(true);
  }

}
