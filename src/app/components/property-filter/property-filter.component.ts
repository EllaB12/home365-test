import { Component, OnInit } from '@angular/core';
import { PropertyService } from 'src/app/services/property.service';

@Component({
  selector: 'property-filter',
  templateUrl: './property-filter.component.html',
  styleUrls: ['./property-filter.component.scss']
})
export class PropertyFilterComponent implements OnInit {

  constructor(
    private propertyService: PropertyService
  ) { }

  ngOnInit(): void {
  }

  public setFilter(term: string, topic: string) {
    this.propertyService.setFilter({ term, topic});
  }


}
