import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TreeNode } from 'primeng/api';


@Injectable()
export class WweVagAgentService {

  constructor(private http : HttpClient) { }

  public getHierarchicalData(){
    return this.http.get('assets/json/wweVagAgentData.json')
  }
  
}
