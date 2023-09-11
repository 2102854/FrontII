import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './../auth/login.service';


import { Cidade } from './cidades.model';

	@Injectable({
		providedIn: 'root'
	})

	export class CidadesService {

  		baseUrl = `${environment.baseUrl}/cidades`

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
    
		read(): Observable<Cidade[]> {   
			return this.httpCliente.get<Cidade[]>(this.baseUrl,{ headers: this.headers})
		}	

		readById(id: string): Observable<Cidade> {
			const url = `${this.baseUrl}/${id}`
			return this.httpCliente.get<Cidade>(url,{ headers: this.headers})
		}
		
		create(cidade: Cidade): Observable<Cidade> {
			const url = `${this.baseUrl}/add`
			return this.httpCliente.post<Cidade>(url, cidade, { headers: this.headers})
		}
		
		update(cidade: Cidade): Observable<Cidade> {
			const url = `${this.baseUrl}/update/${cidade.cidade_id}`
			return this.httpCliente.put<Cidade>(url, cidade, { headers: this.headers})
		}		
}
