import {TemplateRef} from "@angular/core";

export interface ColumnInterface{
  header:string,
  key:string,
  className?:string,
  searchable?:boolean,
  cell?:any,
  handleEvent?:($event:any,...row:any[])=>void
}
