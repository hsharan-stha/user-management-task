import {Component, Input} from '@angular/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  faCoffee = faCoffee;

  @Input() public message: string ="";

}
