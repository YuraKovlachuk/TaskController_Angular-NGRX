import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FilterService} from "../../../services/filter.service";
import {debounceTime, distinctUntilChanged, fromEvent, Subscription} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  @Input()  filters: {value: string, name: string}[]
  @Input()  sorts: {label: string, sorts: {value: string, name: string}[]}[]
  @Input()  title: string

  @ViewChild("filterInput", {static: true}) filterInput: ElementRef;
  eventSubscribe: Subscription

  constructor(public filterService: FilterService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.eventSubscribe = fromEvent<InputEvent>(this.filterInput.nativeElement, "input").pipe(
      map((e) => {
        const input = e.target as HTMLInputElement
        return input.value
      }),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {this.filterService.filterValue.next(value)})
  }

  ngOnDestroy() {
    this.eventSubscribe.unsubscribe()
  }

  setOrder(order: string) {
    if(order === 'ASC') {
      this.filterService.isDesc.next(false)
      // this.order.emit(false)
    } else {
      this.filterService.isDesc.next(true)
      // this.order.emit(true)
    }
  }

}
