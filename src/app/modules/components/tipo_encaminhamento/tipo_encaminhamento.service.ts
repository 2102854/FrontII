import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './../auth/login.service'
import { CookieService } from 'ngx-cookie-service';
import { Tipo_Encaminhamento } from './tipo_encaminhamento.model';

	@Injectable({
		providedIn: 'root'
	})

	export class Tipo_EncaminhamentoService {

  		baseUrl = `${environment.baseUrl}/patient_referral`

  		constructor(private httpCliente: HttpClient, private router: Router, private loginService: LoginService, public cookieService: CookieService) { }

		ngOnInit(): void {	
		}

		read(): Observable<Tipo_Encaminhamento[]> {  
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
			return this.httpCliente.get<Tipo_Encaminhamento[]>(this.baseUrl,{ headers: headers})
		}	

		readById(id: string): Observable<Tipo_Encaminhamento> {
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
			return this.httpCliente.get<Tipo_Encaminhamento>(url,{ headers: headers})
		}
		
		create(tipo_encaminhamento: Tipo_Encaminhamento): Observable<Tipo_Encaminhamento> {
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
			return this.httpCliente.post<Tipo_Encaminhamento>(url, tipo_encaminhamento, { headers: headers})
		}
		
		update(tipo_encaminhamento: Tipo_Encaminhamento): Observable<Tipo_Encaminhamento> {
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
			const url = `${this.baseUrl}/update/${tipo_encaminhamento.tipo_encaminhamento_id}`
			return this.httpCliente.put<Tipo_Encaminhamento>(url, tipo_encaminhamento, { headers: headers})
		}		
}
