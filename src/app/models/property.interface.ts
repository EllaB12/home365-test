import { Tenant } from './tenant.interface';

export interface Property {
    propertyId: string,
    createdOn: string,
    address: string,
    occupiedStats: string,
    owner: string,
    ownerStatus: string,
    tenant: Tenant,
    plan: string
}