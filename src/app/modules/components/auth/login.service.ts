import { Authorization } from './authorization.model';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

	baseUrl = `${environment.baseUrl}/`

	headers = new HttpHeaders({
		"Access-Control-Allow-Credentials": "true",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "PUT,GET,POST,DELETE",
		"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
		"Content-Type" : "application/json",
		"Accept" : "application/json"
	} )  

  	constructor(private httpCliente: HttpClient ) { }

  	login(auth: Authorization): Observable<Authorization> {
		let newUrl = this.baseUrl + "login"   
		return this.httpCliente.post<Authorization>(newUrl, auth, { headers: this.headers})
  	}

	validateToken(token: any): Observable<any>{		
		let newUrl = this.baseUrl + "token_validate";
		this.headers = new HttpHeaders({  
			"x-access-token": String(token),
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "PUT,GET,POST,DELETE",
			"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
			"Content-Type" : "application/json",
			"Accept" : "application/json"
		} ) 
		return this.httpCliente.get<any>(newUrl, { headers: this.headers})
	}
  
	//"Authorization": "Bearer " + token,
	logout(token: any):Observable<any>{
		let newUrl = this.baseUrl + "logout";
		this.headers = new HttpHeaders({  
			"x-access-token": String(token),
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "PUT,GET,POST,DELETE",
			"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept"
		} ) 
		return this.httpCliente.delete<any>(newUrl, { headers: this.headers})
	}

	validateSession() : boolean {
		let token = localStorage.getItem('@sisGerTransPac-t')
		if (token === '' || token === null || token === undefined){
			localStorage.clear(); 
			return false        
		} 	
		
		this.validateToken(token).subscribe({
			next: (result) => {
				let tokenResult = result.token
				if (tokenResult != 'Válido') {
					return true
				} else {
					return false
				}
			},
			complete: () => {},
			error: (e) => {
				localStorage.clear(); 
				return false     
			}			  
		})

		return true
	}
}