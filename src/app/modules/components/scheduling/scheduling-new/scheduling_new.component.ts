
import { Scheduling } from './../scheduling.model';
import { SchedulingService } from './../scheduling.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { CidadesService } from "../../cidades/cidades.service";
import { Tipo_Encaminhamento } from "../../tipo_encaminhamento/tipo_encaminhamento.model";
import { Tipo_EncaminhamentoService } from "../../tipo_encaminhamento/tipo_encaminhamento.service"
import { Tipo_Doenca } from "../../tipo_doenca/tipo_doenca.model";
import { Tipo_Remocao } from "../../tipo_remocao/tipo_remocao.model";
import { Tipo_RemocaoService } from "../../tipo_remocao/tipo_remocao.service";
import { Tipo_DoencaService } from "../../tipo_doenca/tipo_doenca.service";
import { Patients } from "../../patients/patients.model";
import { PatientsService} from "../../patients/patients.service";
import { Hospital } from "../../hospitals/hospitals.model";
import { HospitalsService } from "../../hospitals/hospitals.service";
import { Veiculos } from "../../veiculos/veiculos.model";
import { VeiculosService } from "../../veiculos/veiculos.service";
import { Motorista } from "../../motoristas/motoristas.model";
import { MotoristasService} from "../../motoristas/motoristas.service";
import { FormControl, FormGroup } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-patients-create',
    templateUrl: './scheduling_new.component.html',
    styleUrls: ['./scheduling_new.component.css'],
    providers: [MessageService]
})

export class SchedulingNewComponent implements OnInit {
    
    patients: Patients [] = [];
    selectedPatients: Patients | undefined; 

    hospital: Hospital[] = [];
    selectedHospital: Hospital | undefined; 

    tipo_Encaminhamento: Tipo_Encaminhamento [] = [];
    selectedTipoEncaminhamento: Tipo_Encaminhamento | undefined;

    tipo_Doenca: Tipo_Doenca[] = [];
    selectedTipoDoenca: Tipo_Doenca | undefined;

    tipo_Remocao: Tipo_Remocao[] = [];
    selectedTipoRemocao: Tipo_Remocao | undefined;

    motorista: Motorista[] = []; 
    selectedMotorista: Motorista | undefined;
    
    veiculos: Veiculos[] = []; 
    selectedVeiculos: Veiculos | undefined;

    formGroup: FormGroup | undefined;    
    
    //Breadcrumb
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;

    //Objeto principal do form
    scheduling: Scheduling = {
        agendamento_id: null,
        paciente_id: null,
        tipo_encaminhamento_id: null,
        tipo_doenca_id: null,
        tipo_remocao_id: null,
        hospital_id: null,
        veiculo_id: null,
        motorista_id: null,
        responsavel_pac: null,
        data_remocao: null,
        saida_prevista: null,
        observacao: null,
        custo_ifd: null,
        custo_estadia: null,
        estado_geral_paciente: null,        
    }
        
    constructor( 
        private config: PrimeNGConfig, private cidadesService: CidadesService,private loginService: LoginService, 
        private schedulingService: SchedulingService, private router: Router, private messageService: MessageService,
        private tipo_EncaminhamentoService: Tipo_EncaminhamentoService, private tipo_DoencaService: Tipo_DoencaService,
        private tipo_RemocaoService: Tipo_RemocaoService, private patientsService:PatientsService,
        private hospitalsService: HospitalsService, private MotoristasService: MotoristasService,
        private veiculosService: VeiculosService
        ) 
    {
        setTimeout(() => {
            this.loginService.validateSession()
             if (!this.loginService.sessionIsValid){
                this.messageService.add({ severity: 'error', summary: 'Sessão encerrada', detail: 'Deslogado por inatividade' });
                this.router.navigate(['/auth/login'])
            }
        }, 500)		
    }

    ngOnInit(): void {
        this.config.setTranslation({
            monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
            monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
            today: 'hoje',
            clear: 'limpar',
            dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
            dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado']
        });      

        this.tipo_EncaminhamentoService.read().subscribe (tipo_encaminhamento => {
            this.tipo_Encaminhamento = tipo_encaminhamento
        });

        this.tipo_DoencaService.read().subscribe (tipo_doenca => {
            this.tipo_Doenca = tipo_doenca
        }); 
        
        setTimeout(() => {
            this.tipo_RemocaoService.read().subscribe (tipo_Remocao => {
                this.tipo_Remocao = tipo_Remocao
            });
        }, 200)
        
        setTimeout(() => {
            this.patientsService.read().subscribe(patients => {
                this.patients = patients   
            });
        }, 300)

        setTimeout(() => {
            this.hospitalsService.read().subscribe(hospital => {
                this.hospital = hospital     
            });
        }, 400)

        setTimeout(() => {
            this.veiculosService.read().subscribe(veiculos => {
                this.veiculos = veiculos   
            });
        }, 500)

        setTimeout(() => {
            this.MotoristasService.read().subscribe(motorista => {
                this.motorista = motorista   
            });
        }, 500)

         

        this.formGroup = new FormGroup({
            selectedCidade: new FormControl<object | null>(null)
        });

        // Componente Breadcrumb
        this.items = [{ label: 'Agendamentos', routerLink: '/app/agendamento' }, { label: 'Novo Registro' }];
        this.home = { icon: 'pi pi-home', routerLink: '/app/dashboard' };
    }
    
    create(): void {
        /*
        this.paciente.nome = this.paciente.nome.toUpperCase().trim();
        this.paciente.cidade_id = this.selectedCidade.cidade_id;
        this.paciente.data_nasc = this.paciente.data_nasc;
        this.paciente.tel_1 = this.paciente.tel_1;
        this.paciente.tel_2 = this.paciente.tel_2;
        this.paciente.logradouro = this.paciente.logradouro.toUpperCase().trim();
        this.paciente.numero = this.paciente.numero.toUpperCase().trim();
        this.paciente.complemento = this.paciente.complemento.toUpperCase().trim();
        this.paciente.cep = this.paciente.cep.toUpperCase().trim();
        this.paciente.hygia = this.paciente.hygia.toUpperCase().trim();
        this.paciente.data_cadastro = this.paciente.data_cadastro;


        this.patientsService.create(this.paciente).subscribe({
            next: () => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Registro gravado com sucesso!' });
                setTimeout(() => {
                    this.router.navigate(['/app/pacientes'])
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
        this.router.navigate(['/app/agendamento'])
    }
    

}