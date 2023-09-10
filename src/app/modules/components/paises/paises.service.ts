import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './../auth/login.service'


import { Pais } from './paises.model';

	@Injectable({
		providedIn: 'root'
	})

	export class PaisesService {

  		baseUrl = `${environment.baseUrl}/paises`

 		token = localStorage.getItem('@sisGerTransPac-t')

		headers = new HttpHeaders({  
			"x-access-token": String(this.token),
			"Access-Control-Allow-Credentials": "true",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "PUT,GET,POST,DELETE",
			"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
			"Content-Type" : "application/json",
			"Accept" : "application/json"
		} ) 

  		constructor(private httpCliente: HttpClient, private router: Router, private loginService: LoginService) { }

		ngOnInit(): void {	
		}
    
		read(): Observable<Pais[]> {   
			return this.httpCliente.get<Pais[]>(this.baseUrl,{ headers: this.headers})
		}	

		readById(id: string): Observable<Pais> {
			const url = `${this.baseUrl}/${id}`
			return this.httpCliente.get<Pais>(url,{ headers: this.headers})
		}
		
		create(pais: Pais): Observable<Pais> {
			const url = `${this.baseUrl}/add`
			return this.httpCliente.post<Pais>(url, pais, { headers: this.headers})
		}
		
		update(pais: Pais): Observable<Pais> {
			const url = `${this.baseUrl}/update/${pais.pais_id}`
			return this.httpCliente.put<Pais>(url, pais, { headers: this.headers})
		}		
}
