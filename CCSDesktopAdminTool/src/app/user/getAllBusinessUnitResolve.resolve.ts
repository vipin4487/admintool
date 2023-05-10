import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { BusinessUnitService } from "../businessunit/businessunit.service";
import {  IBusinessUnitList } from "../model/businessUnit";

@Injectable()
export class GetAllBusinessUnitResolve implements Resolve<any> {

    constructor(private businessUnitService : BusinessUnitService) {}
  
    resolve(route: ActivatedRouteSnapshot) {
       return this.businessUnitService.getAllBusinessUnit();
       //.subscribe((res: IBusinessUnitList[]) => {
       //     return res;
      //  });
    }

}