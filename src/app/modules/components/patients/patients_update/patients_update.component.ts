
import { Patients } from './../patients.model';
import { PatientsService } from './../patients.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';



@Component({
    selector: 'app-patients-create',
    templateUrl: './patients_update.component.html',
    styleUrls: ['./patients_update.component.css'],
    providers: [MessageService]
})

export class PatientsUpdateComponent implements OnInit {
    
    //Breadcrumb
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;

    //Objeto principal do form
    
    patients: Patients = {
        paciente_id: null,
        cidade_id: null,
        nome: null, 
        data_nasc: null,
        tel_1: null,
        tel_2: null,
        logradouro: null,
        numero: null, 
        complemento: null,
        cep: null,
        hygia: null,
        data_cadastro: null
    }
        
    constructor(private loginService: LoginService, private patientsService: PatientsService, private router: Router, private messageService: MessageService, private route: ActivatedRoute) {
        setTimeout(() => {
            this.loginService.validateSession()
             if (!this.loginService.sessionIsValid){
                this.messageService.add({ severity: 'error', summary: 'Sessão encerrada', detail: 'Deslogado por inatividade' });
                this.router.navigate(['/auth/login'])
            }
        }, 500)		
    }
    
    ngOnInit(): void {
        // Componente Breadcrumb
        this.items = [{ label: 'Pais', routerLink: '/app/paises' }, { label: 'Atualização do Registro' }];
        this.home = { icon: 'pi pi-home', routerLink: '/app/dashboard' };
        //Carrega os dados do pais
        setTimeout(() => {
            const id = this.route.snapshot.paramMap.get('id')
            this.patientsService.readById(id).subscribe(patients => {
                this.patients = patients 
            })          
        }, 200)         
    }
    
    update(): void {
        /*
        this.patients.nome = this.patients.nome.toUpperCase().trim()
        this.patients.sigla = this.patients.sigla.toUpperCase().trim()

        this.patientsService.update(this.pais).subscribe({
            next: () => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Registro alterado com sucesso!' });
                setTimeout(() => {
                    this.router.navigate(['/app/paises'])
                }, 2500)                                
            },
            complete: () => {},
            error: (e) => {
                if (e.error['message err'] !== undefined) {
                    this.messageService.add({key: 'tst', severity: 'error', summary: 'ATENÇÃO', detail: e.error['message err'] });
                } else {
                    this.messageService.add({key: 'tst', severity: 'error', summary: 'ATENÇÃO', detail: 'Não foi possível executar a ação.' });
                }
                
            }	
        })
        */
    }
    
    cancel(): void {       
        this.router.navigate(['/app/paises'])
    }
}