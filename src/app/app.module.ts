import { NgModule } from '@angular/core';
import { LocationStrategy, Location, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './modules/components/notfound/notfound.component';
import { ProductService } from './modules/service/product.service';
import { CustomerService } from './modules/service/customer.service';
import { EventService } from './modules/service/event.service';
import { IconService } from './modules/service/icon.service';
import { NodeService } from './modules/service/node.service';
import { PhotoService } from './modules/service/photo.service';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule
    ],
    providers: [
        Location, {provide: LocationStrategy, useClass: PathLocationStrategy},
        CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
