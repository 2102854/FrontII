import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './../auth/login.service'
import { CookieService } from 'ngx-cookie-service';
import { Hospital } from './hospitals.model';

	@Injectable({
		providedIn: 'root'
	})

	export class HospitalsService {

  		baseUrl = `${environment.baseUrl}/hospitais`

  		constructor(private httpCliente: HttpClient, private router: Router, private loginService: LoginService, public cookieService: CookieService) { }

		ngOnInit(): void {	
		}
    
		read(): Observable<Hospital[]> {  
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
			return this.httpCliente.get<Hospital[]>(this.baseUrl,{ headers: headers})
		}	

		readById(id: string): Observable<Hospital> {
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
			return this.httpCliente.get<Hospital>(url,{ headers: headers})
		}
		
		create(hospital: Hospital): Observable<Hospital> {
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
			return this.httpCliente.post<Hospital>(url, hospital, { headers: headers})
		}
		
		update(hospital: Hospital): Observable<Hospital> {
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
			const url = `${this.baseUrl}/update/${hospital.hospital_id}`
			return this.httpCliente.put<Hospital>(url, hospital, { headers: headers})
		}		
}
