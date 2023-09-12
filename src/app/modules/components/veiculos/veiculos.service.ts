import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './../auth/login.service';


import { Veiculos } from './veiculos.model';

	@Injectable({
		providedIn: 'root'
	})

	export class VeiculosService {

  		baseUrl = `${environment.baseUrl}/veiculos`
  		constructor(private httpCliente: HttpClient, private router: Router, private loginService: LoginService) { }

		ngOnInit(): void {		
		}
    
		read(): Observable<Veiculos[]> {   
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
			return this.httpCliente.get<Veiculos[]>(this.baseUrl,{ headers: headers})
		}	

		readById(id: string): Observable<Veiculos> {
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
			return this.httpCliente.get<Veiculos>(url,{ headers: headers})
		}
		
		create(veiculo: Veiculos): Observable<Veiculos> {
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
			return this.httpCliente.post<Veiculos>(url, veiculo, { headers: headers})
		}
		
		update(veiculo: Veiculos): Observable<Veiculos> {
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
			const url = `${this.baseUrl}/update/${veiculo.veiculo_id}`
			return this.httpCliente.put<Veiculos>(url, veiculo, { headers: headers})
		}		
}
