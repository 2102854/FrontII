import { ChangePassword } from './usuarios.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

	public sessionIsValid: boolean = false;

	baseUrl = `${environment.baseUrl}`

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
		const newUrl = `${this.baseUrl}/usuarios/change_password` 
		return this.httpCliente.post<ChangePassword>(newUrl, cp, { headers: this.headers})
	}
}