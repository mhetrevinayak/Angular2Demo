import { IEmployee } from "./employee";
import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class EmployeeService {
    constructor(private _http: Http) { }

    getEmployees(): Observable<IEmployee[]> {
        return this._http.get("http://localhost:50218/api/employees")
            .map((response: Response, i: number) => <IEmployee[]>response.json())
            .catch(this.handleError);       
        
    }

    getEmployeeByCode(empCode: string): Promise<IEmployee> {
        return this._http.get("http://localhost:50218/api/employees/" + empCode)
            //.map((response: Response) => <IEmployee>response.json())
            .toPromise()
            .then(response => <IEmployee>response.json())
            .catch(this.handlePromiseError);
            
    }

    private handlePromiseError(error: any): Promise<any> {
        console.error('from service : ' + error);// for demo purposes only
        return Promise.reject(error.message || error);
    }    

    handleError(error: Response) {
        console.error('from service : '+error);
        return Observable.throw(error);
    }
}