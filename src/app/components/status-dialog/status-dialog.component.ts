import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Property } from '../../models/property.interface';
import { DialogData } from '../../models/dialogData.interface'

@Component({
  selector: 'status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.scss']
})
export class StatusDialogComponent implements OnInit {
  content!: string;
  status!: string;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<StatusDialogComponent>
  ) { }

  ngOnInit(): void {
    const topic = this.data.topic;
    const property = this.data.property;

    if (topic === 'property') {
      this.setPropertyInfo(property)
    } else if (topic === 'owner') {
      this.setOwnerInfo(property);
    } else {
      this.setTenantInfo(property);
    }
  }

  public onCloseClick(): void {
    this.dialogRef.close();
  }

  private setPropertyInfo(property: Property) {
    this.content = property.address;
    this.status = property.occupiedStats;
  }

  private setOwnerInfo(property: Property) {
    this.content = property.owner;
    this.status = property.ownerStatus;
  }

  private setTenantInfo(property: any) {
    this.content = property.tenant.firstName + ' ' + property.tenant.lastName;
    this.status = property.tenant.tenantStatus;
  }

}
