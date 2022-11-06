import {BehaviorSubject} from "rxjs";

export class FilterService {
  input$ = new BehaviorSubject<string>('');
  filterName = new BehaviorSubject<string>('');
  filterValue = new BehaviorSubject<string>('');
  sortBy = new BehaviorSubject<string>('');
  isDesc = new BehaviorSubject<boolean>(true);

  constructor() { }

  setValue(inputValue: string) {
    this.input$.next(inputValue)
  }
}
