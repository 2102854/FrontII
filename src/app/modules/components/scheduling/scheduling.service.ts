import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './../auth/login.service'
import { Scheduling, SchedulingFull } from './scheduling.model';

	@Injectable({
		providedIn: 'root'
	})

	export class SchedulingService {

  		baseUrl = `${environment.baseUrl}/agendamentos`

  		constructor(private httpCliente: HttpClient, private router: Router, private loginService: LoginService) { }

		ngOnInit(): void {}
    
		read(): Observable<SchedulingFull[]> {  
			let token = localStorage.getItem('@sisGerTransPac-t')
			let headers = new HttpHeaders({  
				"x-access-token": String(token),
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET",
				"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
				"Content-Type" : "application/json",
				"Accept" : "application/json"
			} )						 
			return this.httpCliente.get<SchedulingFull[]>(this.baseUrl,{ headers: headers})
		}	

		readById(id: string): Observable<Scheduling> {
			let token = localStorage.getItem('@sisGerTransPac-t')
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
			return this.httpCliente.get<Scheduling>(url,{ headers: headers})
		}
		
		create(scheduling: Scheduling): Observable<Scheduling> {
			let token = localStorage.getItem('@sisGerTransPac-t')
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
			return this.httpCliente.post<Scheduling>(url, scheduling, { headers: headers})
		}
		
		update(scheduling: Scheduling): Observable<Scheduling> {
			let token = localStorage.getItem('@sisGerTransPac-t')
			let headers = new HttpHeaders({  
				"x-access-token": String(token),
				"Access-Control-Allow-Credentials": "true",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "PUT",
				"Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept",
				"Content-Type" : "application/json",
				"Accept" : "application/json"
			} ) 			
			const url = `${this.baseUrl}/update/${scheduling.agendamento_id}`
			return this.httpCliente.put<Scheduling>(url, scheduling, { headers: headers})
		}		
}
