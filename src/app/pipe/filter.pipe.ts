import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  // eslint-disable-next-line
  transform(value: any, ...args: any[]): any {
    if(!value) return [];
    if(args[0]?.label==="") return value;
    const searchText= args[0]?.label.toLowerCase();
    // eslint-disable-next-line
    return value.filter((i:any)=>i.label.toLowerCase().includes(searchText));
  }

}
