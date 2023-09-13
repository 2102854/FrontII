import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from './../auth/login.service'


import { Dashboard } from './dashboard.model';

	@Injectable({
		providedIn: 'root'
	})

	export class DashboardService {

  		baseUrl = `${environment.baseUrl}/dashboard`
  		constructor(private httpCliente: HttpClient, private router: Router, private loginService: LoginService) { }

		ngOnInit(): void {		
		}
    
		getDashboard(): Observable<Dashboard> {   			
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
			return this.httpCliente.get<Dashboard>(this.baseUrl,{ headers: headers})
		}	
}
