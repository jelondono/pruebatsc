import { NavigationComponent } from './components/navigation/navigation.component';
import { GeneralInterface } from './models/General.model';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CRUDComponent } from './components/crud/crud.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { UserService } from './services/user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent, CRUDComponent,NavigationComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule,NgxPaginationModule,NgbModule ],
  providers: [UserService, GeneralInterface],
  bootstrap: [AppComponent],
})
export class AppModule {}
