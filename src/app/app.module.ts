import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { InicialComponent } from './components/inicial/inicial.component'; 
import { CadastroComponent } from './components/cadastro/cadastro.component'; 
import { CadastroCompraComponent } from './components/cadastro-compra/cadastro-compra.component'; 
import { CompraComponent } from './components/compra/compra.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CompraComponent, 
    InicialComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    CadastroComponent, 
    CadastroCompraComponent, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
