import {Component, Input} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {Observable} from "rxjs";
import {ColumnInterface} from "@/app/interface/ColumnInterface";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    NgTemplateOutlet
  ],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent {

  @Input() dataList$:Observable<any>;
  @Input() columns:ColumnInterface[];
  constructor(private sanitizer: DomSanitizer) {}

  getCellContent(row: any, column: any): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(column.cell(row));
  }

  innerHtmlClick($event:any){
    console.log($event)
  }

  // edit(row: any) {
  //   console.log('Editing:', row);
  //   // Logic to edit the row
  // }

}
