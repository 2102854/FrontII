import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './../auth/login.service';
import { Cidade, CidadeFull } from './cidades.model';

	@Injectable({
		providedIn: 'root'
	})

	export class CidadesService {

  		baseUrl = `${environment.baseUrl}/cidades`
  		constructor(private httpCliente: HttpClient, private router: Router, private loginService: LoginService) { }

		ngOnInit(): void {}
    
		read(): Observable<CidadeFull[]> {   
			let token = localStorage.getItem('@sisGerTransPac-t')
			let headers = new HttpHeaders({  
				"x-access-token": String(token),
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET",
				"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
				"Content-Type" : "application/json",
				"Accept" : "application/json"
			})				
			return this.httpCliente.get<CidadeFull[]>(this.baseUrl,{ headers: headers})
		}	

		readById(id: string): Observable<Cidade> {
			let token = localStorage.getItem('@sisGerTransPac-t')
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
			return this.httpCliente.get<Cidade>(url,{ headers: headers})
		}
		
		create(cidade: Cidade): Observable<Cidade> {
			let token = localStorage.getItem('@sisGerTransPac-t')
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
			return this.httpCliente.post<Cidade>(url, cidade, { headers: headers})
		}
		
		update(cidade: Cidade): Observable<Cidade> {
			let token = localStorage.getItem('@sisGerTransPac-t')
			let headers = new HttpHeaders({  
				"x-access-token": String(token),
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET",
				"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
				"Content-Type" : "application/json",
				"Accept" : "application/json"
			})				
			const url = `${this.baseUrl}/update/${cidade.cidade_id}`
			return this.httpCliente.put<Cidade>(url, cidade, { headers: headers})
		}		
}
