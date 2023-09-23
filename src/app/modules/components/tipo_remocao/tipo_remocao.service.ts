import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './../auth/login.service'
import { CookieService } from 'ngx-cookie-service';
import { Tipo_Remocao } from './tipo_remocao.model';

	@Injectable({
		providedIn: 'root'
	})

	export class Tipo_RemocaoService {

  		baseUrl = `${environment.baseUrl}/tipo_remocao`

  		constructor(private httpCliente: HttpClient, private router: Router, private loginService: LoginService, public cookieService: CookieService) { }

		ngOnInit(): void {	
		}
    
		read(): Observable<Tipo_Remocao[]> {  
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
			return this.httpCliente.get<Tipo_Remocao[]>(this.baseUrl,{ headers: headers})
		}	

		readById(id: string): Observable<Tipo_Remocao> {
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
			return this.httpCliente.get<Tipo_Remocao>(url,{ headers: headers})
		}
		
		create(tipo_remocao: Tipo_Remocao): Observable<Tipo_Remocao> {
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
			return this.httpCliente.post<Tipo_Remocao>(url, tipo_remocao, { headers: headers})
		}
		
		update(tipo_remocao: Tipo_Remocao): Observable<Tipo_Remocao> {
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
			const url = `${this.baseUrl}/update/${tipo_remocao.tipo_remocao_id}`
			return this.httpCliente.put<Tipo_Remocao>(url, tipo_remocao, { headers: headers})
		}		
}
