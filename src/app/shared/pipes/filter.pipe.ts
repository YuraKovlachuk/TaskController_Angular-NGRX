import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterString: string, property: string): any {
    try {
      if (value.length === 0 || !filterString) {
        return value;
      }
      let filteredUsers: unknown[] = []
      let properties = property.split('.')
      for (let obj of value) {
        if (properties.length > 1) {
          const items = obj[properties[0]]
          for (let item of items) {
            if (item[properties[1]].toLowerCase().includes(filterString.toLowerCase())) {
              if(filteredUsers.includes(obj)) {continue;}
              filteredUsers.push(obj);
            }
          }
        } else {
          if (obj[properties[0]].toLowerCase().includes(filterString.toLowerCase())) {
            filteredUsers.push(obj);
          }
        }
      }
      return filteredUsers;
    } catch (e) {
      return value
    }
  }
}

