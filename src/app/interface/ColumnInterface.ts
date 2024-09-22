export interface ColumnInterface{
  header:string,
  key:string,
  className?:string,
  searchable?:boolean,
  // eslint-disable-next-line
  cell?:any,
  // eslint-disable-next-line
  handleEvent?:($event:any,...row:any[])=>void
}
