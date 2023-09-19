import { NgModule } from '@angular/core';
import { LocationStrategy, Location, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './modules/components/notfound/notfound.component';
import { CookieService } from 'ngx-cookie-service';
import { VLibrasComponent } from './modules/components/vlibras/vlibras.component';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent,VLibrasComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule
    ],
    providers: [
        CookieService,
        Location, {provide: LocationStrategy, useClass: PathLocationStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
