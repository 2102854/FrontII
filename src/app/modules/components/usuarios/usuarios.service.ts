import { ChangePassword } from './usuarios.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { User, Permission } from './usuarios.model';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

	public sessionIsValid: boolean = false;

	baseUrl = `${environment.baseUrl}/usuarios`

	headers = new HttpHeaders({
		"Access-Control-Allow-Credentials": "true",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "PUT,GET,POST,DELETE",
		"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
		"Content-Type" : "application/json",
		"Accept" : "application/json"
	} )  

  	constructor(private httpCliente: HttpClient, private cookieService: CookieService) { }
	   
	changePassword(cp: ChangePassword): Observable<ChangePassword> {
		let token = this.cookieService.get('_sisgertranspac-t')
		console.log(token)
		this.headers = new HttpHeaders({  
			"x-access-token": String(token),
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST",
			"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
			"Content-Type" : "application/json",
			"Accept" : "application/json"
		} ) 		
		const newUrl = `${this.baseUrl}/change_password` 
		return this.httpCliente.post<ChangePassword>(newUrl, cp, { headers: this.headers})
	}

	read(): Observable<User[]> {  
		let token = this.cookieService.get('_sisgertranspac-t')
		let headers = new HttpHeaders({  
			"x-access-token": String(token),
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET",
			"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
			"Content-Type" : "application/json",
			"Accept" : "application/json"
		} )						 
		return this.httpCliente.get<User[]>(this.baseUrl,{ headers: headers})
	}	

	readById(id: string): Observable<User> {
		let token = this.cookieService.get('_sisgertranspac-t')
		let headers = new HttpHeaders({  
			"x-access-token": String(token),
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET",
			"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
			"Content-Type" : "application/json",
			"Accept" : "application/json"
		} ) 			
		const url = `${this.baseUrl}/${id}`
		return this.httpCliente.get<User>(url,{ headers: headers})
	}
	
	create(user: User): Observable<User> {
		let token = this.cookieService.get('_sisgertranspac-t')
		let headers = new HttpHeaders({  
			"x-access-token": String(token),
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "POST",
			"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
			"Content-Type" : "application/json",
			"Accept" : "application/json"
		} ) 			
		const url = `${this.baseUrl}/add`
		return this.httpCliente.post<User>(url, user, { headers: headers})
	}
	
	update(user: User): Observable<User> {
		let token = this.cookieService.get('_sisgertranspac-t')
		let headers = new HttpHeaders({  
			"x-access-token": String(token),
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "PUT",
			"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
			"Content-Type" : "application/json",
			"Accept" : "application/json"
		} ) 			
		const url = `${this.baseUrl}/update/${user.usuario_id}`
		return this.httpCliente.put<User>(url, user, { headers: headers})
	}		

	get_permissao(): Observable<Permission[]> {  
		let token = this.cookieService.get('_sisgertranspac-t')
		let headers = new HttpHeaders({  
			"x-access-token": String(token),
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET",
			"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
			"Content-Type" : "application/json",
			"Accept" : "application/json"
		} )	
		const newUrl = `${environment.baseUrl}/permissions`					 
		return this.httpCliente.get<Permission[]>(newUrl,{ headers: headers})
	}	

}