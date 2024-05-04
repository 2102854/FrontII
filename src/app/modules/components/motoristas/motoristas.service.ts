import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './../auth/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Motoristas } from './motoristas.model';

	@Injectable({
		providedIn: 'root'
	})

	export class MotoristasService {

  		baseUrl = `${environment.baseUrl}/motoristas`
  		constructor(private httpCliente: HttpClient, private router: Router, private loginService: LoginService, public cookieService: CookieService) { }

		ngOnInit(): void {		
		}
    
		read(): Observable<Motoristas[]> {   
			let token = this.cookieService.get('_sisgertranspac-t')
			let headers = new HttpHeaders({  
				"x-access-token": String(token),
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET",
				"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
				"Content-Type" : "application/json",
				"Accept" : "application/json"
			})				
			return this.httpCliente.get<Motoristas[]>(this.baseUrl,{ headers: headers})
		}	

		readById(id: string): Observable<Motoristas> {
			let token = this.cookieService.get('_sisgertranspac-t')
			let headers = new HttpHeaders({  
				"x-access-token": String(token),
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET",
				"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
				"Content-Type" : "application/json",
				"Accept" : "application/json"
			})				
			const url = `${this.baseUrl}/${id}`
			return this.httpCliente.get<Motoristas>(url,{ headers: headers})
		}
		
		create(motorista: Motoristas): Observable<Motoristas> {
			let token = this.cookieService.get('_sisgertranspac-t')
			let headers = new HttpHeaders({  
				"x-access-token": String(token),
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET",
				"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
				"Content-Type" : "application/json",
				"Accept" : "application/json"
			})				
			const url = `${this.baseUrl}/add`
			return this.httpCliente.post<Motoristas>(url, motorista, { headers: headers})
		}
		
		update(motorista: Motoristas): Observable<Motoristas> {
			let token = this.cookieService.get('_sisgertranspac-t')
			let headers = new HttpHeaders({  
				"x-access-token": String(token),
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET",
				"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
				"Content-Type" : "application/json",
				"Accept" : "application/json"
			})				
			const url = `${this.baseUrl}/update/${motorista.motorista_id}`
			return this.httpCliente.put<Motoristas>(url, motorista, { headers: headers})
		}		
}
