export interface PaginateInterface{
  currentPage:number,
  itemPerPage:number,
  nextPage: (page: number) => void,
  previousPage: (page: number) => void,
  search?:{
    value:string,
    key:string
  }

}
