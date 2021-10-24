import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { StatusDialogComponent } from '../status-dialog/status-dialog.component';
import { Property } from '../../models/property.interface';

@Component({
  selector: 'property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  @Input() properties: Property[] = [];
  
  displayedColumns: string[] = [
    'created', 
    'property', 
    'propertyStatus', 
    'plan',
    'owner',
    'ownerStatus',
    'tenant', 
    'tenantStatus'
  ];
  dataSource = new MatTableDataSource<Property>([]);
  isLoading: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    setTimeout(()=> {
      if (this.properties && this.properties.length) {
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(this.properties);
        this.dataSource.paginator = this.paginator;
      }
    }, 2000)
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.properties);
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(topic: string, property: any): void {
    this.dialog.open(StatusDialogComponent, {
      width: '400px',
      data: {topic, property}
    });
  }
}
