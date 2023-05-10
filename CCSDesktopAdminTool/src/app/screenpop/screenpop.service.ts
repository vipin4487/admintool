import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions,URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { UserResponse } from '../user/user.model';
import { IScreenPop, ICen, IScreenPopCriteria } from '../model/screenpop';
//import {  } from '../model/screenpop';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { environment } from '../../environments/environment';

@Injectable()
export class ScreenPopService {
    baseurl: string = environment.api;
    private businessUnitUrl = environment.api + 'api/BusinessUnit/GetBusinessUnits';
    private omniscreenpopsUrl = environment.api + 'api/OmniScreenpop/GetOmniBusinessScreeenpop';
    private omniscreenpopCriteriaUrl = environment.api + 'api/OmniScreenpopCriteria/GetOmniBusinessScreeenpopCriteria';
    private OmniCallEventLurl = environment.api + 'api/OmniScreenPopXML/OmniCallEventNames'
    constructor(private _http: HttpClient) { }


    getscreenpops(buid: number): Observable<IScreenPop[]> {
        return this._http.get<IScreenPop[]>(this.omniscreenpopsUrl + '?buid=' + buid, { withCredentials: true });
        //  .map((res : Response)=>{           

        //  console.log(res);
        //             return <IScreenPop[]>(res.json());
        //         }).catch(this.handleError)
    }

    getCallEvents(): Observable<ICen[]> {
        return this._http.get<ICen[]>(this.OmniCallEventLurl, { withCredentials: true });
        // .map((res: Response) => {

        //     console.log(res);
        //     return <ICen[]>(res.json());
        // }).catch(this.handleError)
    }

    getscreenpopCriteria(buid: number): Observable<IScreenPopCriteria[]> {
        return this._http.get<IScreenPopCriteria[]>(this.omniscreenpopCriteriaUrl + '?buid=' + buid, { withCredentials: true });
        // .map((res: Response) => {

        //     console.log(res);
        //     return <IScreenPopCriteria[]>(res.json());
        // }).catch(this.handleError)
    }

    putActiveStatus(url: string, id: number, Activeint: number, author_id: number): Observable<UserResponse> {

        url = this.baseurl + url;
        let data = {
            "id": id,
            "Activeint": Activeint,
            "author_id": author_id
        };

        let body = JSON.stringify(data);
        //let body = JSON.stringify(model);
        let headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

        const options = {
            headers: headers,
            withCredentials: true
        };
        return this._http.put<UserResponse>(url, body, options);
            // .map((response: Response) => <UserResponse>response.json())
            // .catch(this.handleError);
    }

    putXML(url: string, id: number, XSLTSwitch: number, XML: string): Observable<UserResponse> {

        url = this.baseurl + url;
        let data = {
            "id": id,
            "XSLTSwitch": XSLTSwitch,
            "XML": XML
        };

        let body = JSON.stringify(data);
        //let body = JSON.stringify(model);
        let headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

        const options = {
            headers: headers,
            withCredentials: true
        };
        return this._http.put<UserResponse>(url, body, options);
            // .map((response: Response) => <UserResponse>response.json()).catch(this.handleError);
    }

    DeleteXML(url: string, id: number, XSLTSwitch: number): Observable<UserResponse> {

        url = this.baseurl + url;
        let data = {
            "id": id,
            "XSLTSwitch": XSLTSwitch

        };

        let body = JSON.stringify(data);
        //let body = JSON.stringify(model);
        let headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

        const options = {
            headers: headers,
            withCredentials: true
        };
        return this._http.put<UserResponse>(url, body, options)
            //.map((response: Response) => <UserResponse>response.json()).catch(this.handleError);
    }
    delete(url: string): Observable<UserResponse> {
        let headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
        const options = {
            headers: headers,
            withCredentials: true
        };
        return this._http.delete<UserResponse>(this.baseurl + url, options);
        //.map((response: Response) => <UserResponse>response.json()).catch(this.handleError);
    }
    put(url: string, id: number, model: any): Observable<UserResponse> {
        console.log('put of screenpop service is called');
        url = this.baseurl + url;
        let body = JSON.stringify(model);
        let headers = new HttpHeaders()
        .set('Content-Type', 'application/json');

        const options = {
            headers: headers,
            withCredentials: true
        };
        return this._http.put<UserResponse>(url, body, options);
            // .map((response: Response) => <UserResponse>response.json())
            // .catch(this.handleError);


    }
    post(url: string, model: any): Observable<UserResponse> {
        url = this.baseurl + url;
        console.log(url);
        let body = JSON.stringify(model);
        console.log(body);
        console.log(url);
        let headers = new HttpHeaders()
        .set('Content-Type', 'application/json');
        const options = {
            headers: headers,
            //responseType: ResponseContentType.Json,
            withCredentials: true
        };

        return this._http.post<UserResponse>(url, body, options)
            // .map((response: Response) => {

            //     if (response !== null && response !== undefined) {
            //         console.log(response.json());
            //         return <UserResponse>(response.json());//  <any>response.json()
            //     }
            // })
            // .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }

}



// const ScreenPops : IScreenPop[]= [
//     {
//         // Id: 1,
//         // FirstName: "vipin",
//         // LastName: "bhardwaj",
//         // Email: "xyz.com",
//         // Gender: "male",
//         // DOB: "04/04/1987",
//         // City: "delhi",
//         // State: "delhi",
//         // Zip: "110033",
//         // Country: "india"
//         // Id:1,
//         // Business_Unit_Display_ID: 1,
//         // business_unit_id:1,
//         // display_type_id: 1,
//         // type_priority: 0,
//         display_tag: 'Web Service Call',
//         screen_pop_header: 'Web Service Call',
//         // display_window_size_txt: '',
//         // display_window_location_txt: '',
//         // display_window_top_most_nbr: '',
//         // display_window_properties_txt: '',
//         // Priority : 0,
//         // trigger_call_event_id : 1,
//         // call_type_id : 1,
//         // call_org_type_filter :'',
//         // trigger_timeout_nbr: 0,
//         // timeout_message_txt:'',
//         // Greeting_txt :'',
//         // key_CTI_value:'',
//         data_source_connection_txt: 'Method="',
//         data_source_command_txt :'<root><document></document></root>',
//         data_source_command_input_txt:'',
//         URL_display_address_txt:'http://vccDataTransformService-stage.uhg.com'
//         // ,
//         // survey_type_id:0,
//         // application_script_id:0,
//         // application_id:0,
//         // xslt_transform_file :'',
//         // xslt_transform_file_reply:'',
//         // screenpop_script_xoml:'',
//         // call_type_list:''
//     },
//     {
//         display_tag: 'Web Service Call ',
//         screen_pop_header: 'Web Service Call ',
//         data_source_connection_txt: 'Method',        
//         data_source_command_txt :'<root></root>',
//         data_source_command_input_txt:'',
//         URL_display_address_txt:'http://vccDataTransformService-stage.uhg.com/'       
//     }
//     ,
//     {
//         display_tag: 'Web Service Call ',
//         screen_pop_header: 'Web Service Call ',
//         data_source_connection_txt: 'Method',        
//         data_source_command_txt :'<root></root>',
//         data_source_command_input_txt:'',
//         URL_display_address_txt:'http://vccDataTransformService-stage.uhg.com/'       
//     }
//     ,
//     {
//         display_tag: 'Web Service Call ',
//         screen_pop_header: 'Web Service Call ',
//         data_source_connection_txt: 'Method',        
//         data_source_command_txt :'<root></root>',
//         data_source_command_input_txt:'',
//         URL_display_address_txt:'http://vccDataTransformService-stage.uhg.com/'       
//     }
//     ,
//     {
//         display_tag: 'Web Service Call ',
//         screen_pop_header: 'Web Service Call ',
//         data_source_connection_txt: 'Method',        
//         data_source_command_txt :'<root></root>',
//         data_source_command_input_txt:'',
//         URL_display_address_txt:'http://vccDataTransformService-stage.uhg.com/'       
//     }
//     ,
//     {
//         display_tag: 'Web Service Call ',
//         screen_pop_header: 'Web Service Call ',
//         data_source_connection_txt: 'Method',        
//         data_source_command_txt :'<root></root>',
//         data_source_command_input_txt:'',
//         URL_display_address_txt:'http://vccDataTransformService-stage.uhg.com/'       
//     }
//     ,
//     {
//         display_tag: 'Web Service Call ',
//         screen_pop_header: 'Web Service Call ',
//         data_source_connection_txt: 'Method',        
//         data_source_command_txt :'<root></root>',
//         data_source_command_input_txt:'',
//         URL_display_address_txt:'http://vccDataTransformService-stage.uhg.com/'       
//     }
//     ,
//     {
//         display_tag: 'Web Service Call ',
//         screen_pop_header: 'Web Service Call ',
//         data_source_connection_txt: 'Method',        
//         data_source_command_txt :'<root></root>',
//         data_source_command_input_txt:'',
//         URL_display_address_txt:'http://vccDataTransformService-stage.uhg.com/'       
//     }
//     ,
//     {
//         display_tag: 'Web Service Call ',
//         screen_pop_header: 'Web Service Call ',
//         data_source_connection_txt: 'Method',        
//         data_source_command_txt :'<root></root>',
//         data_source_command_input_txt:'',
//         URL_display_address_txt:'http://vccDataTransformService-stage.uhg.com/'       
//     }
//     ,
//     {
//         display_tag: 'Web Service Call ',
//         screen_pop_header: 'Web Service Call ',
//         data_source_connection_txt: 'Method',        
//         data_source_command_txt :'<root></root>',
//         data_source_command_input_txt:'',
//         URL_display_address_txt:'http://vccDataTransformService-stage.uhg.com/'       
//     }
//     ,
//     {
//         display_tag: 'Web Service Call ',
//         screen_pop_header: 'Web Service Call ',
//         data_source_connection_txt: 'Method',        
//         data_source_command_txt :'<root></root>',
//         data_source_command_input_txt:'',
//         URL_display_address_txt:'http://vccDataTransformService-stage.uhg.com/'       
//     }
//     ,
//     {
//         display_tag: 'Web Service Call ',
//         screen_pop_header: 'Web Service Call ',
//         data_source_connection_txt: 'Method',        
//         data_source_command_txt :'<root></root>',
//         data_source_command_input_txt:'',
//         URL_display_address_txt:'http://vccDataTransformService-stage.uhg.com/'       
//     }
//     ,
//     {
//         display_tag: 'Web Service Call ',
//         screen_pop_header: 'Web Service Call ',
//         data_source_connection_txt: 'Method',        
//         data_source_command_txt :'<root></root>',
//         data_source_command_input_txt:'',
//         URL_display_address_txt:'http://vccDataTransformService-stage.uhg.com/'       
//     }
// ]
