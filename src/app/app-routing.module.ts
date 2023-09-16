import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './modules/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { LoginComponent } from './modules/components/auth/login/login.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'app', component: AppLayoutComponent,
                children: [
                    { path: 'pacientes', loadChildren: () => import('./modules/components/patients/patients.module').then(m => m.PatientsModule) },
                    { path: 'dashboard', loadChildren: () => import('./modules/components/dashboard/dashboard.module').then(m => m.DashboardModule) },                    
                    { path: 'paises', loadChildren: () => import('./modules/components/paises/paises.module').then(m => m.PaisesModule) },
                    { path: 'estados', loadChildren: () => import('./modules/components/estados/estados.module').then(m => m.EstadosModule) },
                    { path: 'cidades', loadChildren: () => import('./modules/components/cidades/cidades.module').then(m => m.CidadesModule) },
                    { path: 'veiculos', loadChildren: () => import('./modules/components/veiculos/veiculos.module').then(m => m.VeiculosModule) },
                    { path: 'motoristas', loadChildren: () => import('./modules/components/motoristas/motoristas.module').then(m => m.VeiculosModule) }
                ]
            },
            { path: '', component: LoginComponent },
            { path: 'auth',    loadChildren: () => import('./modules/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./modules/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}