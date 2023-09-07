import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './../auth/login.service'


import { Estado } from './estados.model';

	@Injectable({
		providedIn: 'root'
	})

	export class EstadosService {

  		baseUrl = `${environment.baseUrl}/estados`

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
			if(this.token != null){
	            if (this.loginService.validateSession()) {
					localStorage.clear(); 
					this.router.navigate(['/', '/auth/login']) 
				}    
			}			
		}
    
		read(): Observable<Estado[]> {   
			return this.httpCliente.get<Estado[]>(this.baseUrl,{ headers: this.headers})
		}	

		readById(id: string): Observable<Estado> {
			const url = `${this.baseUrl}/${id}`
			return this.httpCliente.get<Estado>(url,{ headers: this.headers})
		}
		
		create(estado: Estado): Observable<Estado> {
			const url = `${this.baseUrl}/add`
			return this.httpCliente.post<Estado>(url, estado, { headers: this.headers})
		}
		
		update(estado: Estado): Observable<Estado> {
			const url = `${this.baseUrl}/update/${estado.estado_id}`
			return this.httpCliente.put<Estado>(url, estado, { headers: this.headers})
		}		
}
