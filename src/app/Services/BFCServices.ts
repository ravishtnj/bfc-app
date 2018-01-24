import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class BFCServices{
  constructor(private http: Http) {}
   result:any;

  makeCommonGetRequest(arg:string){
    return this.makeRequest(arg,'GET',"");
  }

  registerUser(arg: any) {
      return this.makeRequest(arg,'POST',"regUser");
  }

  generateOtp(arg:any){
    return this.makeRequest(arg,'POST',"otpMap");
  }

    private makeRequest(param:any,method:string,endPoint:string) {

      let url = 'http://localhost:1337/localhost:3000';//'http://localhost:1337/u-smash.com:3000';
      if(method == "GET"){
      return this.http.get(url+"/"+param.toString())
        .map((res) => res.json());
      }else{
        url = url+"/"+endPoint;
        let params = param;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url,params,options)
        .map((res) => res.json())
      }
    }
}
