import {Component, Input} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {Observable, of} from "rxjs";
import {ColumnInterface} from "@/app/interface/ColumnInterface";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {PaginateInterface} from "@/app/interface/PaginateInterface";

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

  // eslint-disable-next-line
  @Input() dataList$:Observable<any>=of([]);
  @Input() columns:ColumnInterface[]=[];
  @Input() paginate:PaginateInterface={
    currentPage: 0,
    itemPerPage: 0,
    nextPage(page: number): void {
      console.log(page)
    },
    previousPage(page: number): void {
      console.log(page)
    }
  };
  constructor(private sanitizer: DomSanitizer) {}

  // eslint-disable-next-line
  getCellContent(row: any, column: any): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(column.cell(row));
  }

}
