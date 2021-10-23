import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PropertyService } from '../../services/property.service';
import { Property } from '../../models/property.interface';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  properties: Property[] = [];
  propertiesSubscription!: Subscription;

  constructor(
    private propertyService: PropertyService
  ) { }

  ngOnInit(): void {
    this.propertyService.getProperties();
    this.propertiesSubscription = this.propertyService.properties$.subscribe(
      (properties) => (this.properties = properties)
    );
  }

  ngOnDestroy() {
    this.propertiesSubscription.unsubscribe();
  }

}
