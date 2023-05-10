import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
// import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { IDuplicate,IBusinessUnit, IBusinessUnitList,IOmniAgentGroup } from "../model/businessUnit";
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class BusinessUnitService{
    //private baseurl =  this.baseurl + '
    //console.log()
    private businessUnitUrl = environment.api + 'api/BusinessUnit/GetBusinessUnits';
    private allbusinessUnitUrl = environment.api + 'api/BusinessUnit/GetAllBusinessUnit';
     private allOmnibusinessUnitUrl = environment.api + 'api/OmniScreenpop/OmniBusinessUnit';
    private OmniBUbyNameUrl = environment.api + 'api/OmniBusinessunit/OmniBUName';
    //private allOmnibusinessUnitUrl = environment.api + 'api/OmniBusinessunit/GetOmniBusinessUnit';
    
    private headers : Headers;
    // private options : RequestOptions;  
    duplicate1 : IDuplicate
    constructor(private http : HttpClient){
    }

    getBusinessUnit(agentId: number) : Promise<IBusinessUnit[]>{
        const url = this.businessUnitUrl + '?agentID='+agentId;
       
        const response = sessionStorage.getItem(url);
        if(response) {
            return new Promise((resolve) => {
                const result = <IBusinessUnit[]> JSON.parse(response);
                resolve(result);
            });
        } 
        else {
            return new Promise((resolve) => {
                this.http.get<IBusinessUnit[]>(url,{ withCredentials: true})
                  .toPromise()
                  .then(
                    res => { // Success
                      sessionStorage.setItem(url,JSON.stringify(res));
                      resolve(res);
                    },
                    msg => { // Error
                      console.error(msg);
                    }
                  );
              });
        }        
    }
getAllOmniBusinessUnit() {
               return  this.http.get<IOmniAgentGroup[]>(this.allOmnibusinessUnitUrl ,{ withCredentials: true});
    }



getOmniBUByName(BUName : string) {
    //boolean x=false;
               return  this.http.get<IDuplicate>(this.OmniBUbyNameUrl +'/'+ BUName ,{ withCredentials: true})
            //    .map((res : Response)=>{           
            //         this.duplicate1 = <IDuplicate>(res.json());
            //         console.log(this.duplicate1);
            //         return <IDuplicate>(res.json());

            //     }).catch(this.handleError);
    }

    

post(url: string, model: any) {
        let body = JSON.stringify(model);        
        console.log(body);
        let headers = new HttpHeaders().
        set('Content-Type', 'application/json');
        const options = {
            headers: headers,
            withCredentials: true
        };    
        
        return this.http.post<IOmniAgentGroup>(url, body, options); 
            // .map((response) => {
            //     //console.log('Post');
            //     //console.log(response);
            //     if(response !== null && response !== undefined){
            //         return  <IOmniAgentGroup>(response.json());//  <any>response.json()
            //     }
            // })
            // .catch(this.handleError);
    }
    
    // getAllBusinessUnit() : Observable<IBusinessUnitList[]>{
        
    //     return  this.http.get(this.allbusinessUnitUrl ,{ withCredentials: true}).map((res : Response)=>{           
    //         return <IBusinessUnit[]>(res.json());
    //     }).catch(this.handleError)
    // }


    getAllBusinessUnit() {
               return  this.http.get<IBusinessUnitList[]>(this.allbusinessUnitUrl ,{ withCredentials: true})
    }

     private handleError(err: Response) {        
        console.error(err);
        return Observable.throw(err.status);
    }
}
