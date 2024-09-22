import {Component, Input} from '@angular/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-common-types";
import {faAdd} from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {

  @Input() public message: string ="";
  @Input() public icon: IconDefinition=faAdd;

}
