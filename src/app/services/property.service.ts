import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { BehaviorSubject } from 'rxjs';
import { Property } from '../models/property.interface';
import { FilterBy } from '../models/filterBy.interface';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(
    private http: HttpClient
  ) { }

  private _filterBy$ = new BehaviorSubject({ term: 'all', topic: ''});
  public filterBy$ = this._filterBy$.asObservable();

  private _properties$ = new BehaviorSubject<Property[]>([]);
  public properties$ = this._properties$.asObservable();
  
  public getProperties() {
    let properties: Property[] = this.load('proprtiesDB');
    if (!properties || !properties.length) {
      this.http.get('../assets/properties.json').subscribe((data: any) => {
        this.store('propertiesDB', data.properties);
        this.filterProprties(data.properties);
      });
    } else {
      this.filterProprties(properties);
    }
  }

  private filterProprties(properties: Property[]) {
    const filterBy = this._filterBy$.getValue();
    let filterProperties: Property[];

    if (filterBy.term === 'all') {
      this._properties$.next(properties);
      return;
    }
    
    if (filterBy.topic === 'property') {
      filterProperties = filterBy.term === 'active' ? this.filterByActiveStatus(properties) : 
      this.filterByProperty(properties, filterBy.term);
    } else {
      filterProperties = this.filterByTenant(properties, filterBy.term)
    }
    this._properties$.next(filterProperties);
  }

  private filterByActiveStatus(properties: Property[]): Property[] {
    const propertiesByVacantStatus = this.filterByProperty(properties, 'vacant');
    const propertiesByOccupiedStatus = this.filterByProperty(properties, 'occupied');

    return propertiesByVacantStatus.concat(propertiesByOccupiedStatus);
  }

  private filterByProperty(properties: Property[], term: string): Property[]{
      return properties.filter((proprty: Property) =>
        proprty.occupiedStats
        .toLowerCase()
        === term.toLowerCase()
     );
  }

  private filterByTenant(properties: Property[], term: string): Property[] {
    return properties.filter((proprty: Property) =>
      proprty.tenant?.tenantStatus
      .toLowerCase()
      === term.toLowerCase()
   );
}

  public setFilter(filterBy: FilterBy) {
    this._filterBy$.next({ term: filterBy.term, topic: filterBy.topic });
    this.getProperties();
  }

  private store(key: string, value: any){
    localStorage[key] = JSON.stringify(value);
  }

  private load(key: string, defaultValue = null) {
    let value = localStorage[key] || defaultValue;
    return JSON.parse(value);
  }
}
