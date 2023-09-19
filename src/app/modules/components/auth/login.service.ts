import { Authorization } from './authorization.model';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})


export class LoginService {

	public sessionIsValid: boolean = false;

	baseUrl = `${environment.baseUrl}/`

	headers = new HttpHeaders({
		"Access-Control-Allow-Credentials": "true",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "PUT,GET,POST,DELETE",
		"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
		"Content-Type" : "application/json",
		"Accept" : "application/json"
	} )  

  	constructor(private httpCliente: HttpClient, private router: Router, public cookieService: CookieService) { }

  	login(auth: Authorization): Observable<Authorization> {
		this.headers = new HttpHeaders({  
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "PUT,GET,POST,DELETE",
			"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
			"Content-Type" : "application/json",
			"Accept" : "application/json"
		} ) 		
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
		const newUrl = `${this.baseUrl}logout`
		return this.httpCliente.put<String>(newUrl,{'token': token}, { headers: this.headers})
	}

	executeLogout():void {
		let token = this.cookieService.get('_sisgertranspac-t')
		console.log('executeLogout: ' + token)
		this.logout(token).subscribe({
			next: () => {		
			},
			error: () => {	
			},
			complete: () => {
				//Exclui apenas os cookies de sessão 
				this.cookieService.delete('_sisgertranspac-t');
				this.cookieService.delete('_sisgertranspac-n');
				this.cookieService.delete('_sisgertranspac-p');
				this.cookieService.delete('_sisgertranspac-c');					
				this.router.navigate(['/auth/login']);
			}
		})
	}

	validateSession(): void { 
		let token = this.cookieService.get('_sisgertranspac-t')
		if (token === '' || token === null || token === undefined){
			this.sessionIsValid = false 
			//Exclui apenas os cookies de sessão 
			this.cookieService.delete('_sisgertranspac-t');
			this.cookieService.delete('_sisgertranspac-n');
			this.cookieService.delete('_sisgertranspac-p');
			this.cookieService.delete('_sisgertranspac-c');
			this.router.navigate(['/auth/login']);

		} else {	

			this.validateToken(token).subscribe({
				next: (result) => {
					let tokenResult = result.token
					if (tokenResult === 'VALIDO') {
						this.sessionIsValid = true				
					} else {
						this.executeLogout();	
					}
					console.log(result)
				},
				complete: () => {},
				error: (e) => {
					this.sessionIsValid = false  
					this.executeLogout();					  
				}			  
			})
		}

	}
}