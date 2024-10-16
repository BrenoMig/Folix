import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model'; // Verifique se o caminho está correto

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://localhost:7258/api/usuario'; // URL do seu backend atualizado

  constructor(private http: HttpClient) {}

  // Método para cadastrar um usuário
  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  // Método para autenticar o usuário (login)
  autenticar(login: string, senha: string): Observable<any> {
    const url = `${this.apiUrl}/login`; // Verifique se o endpoint do login está correto no seu backend
    const body = { login, senha };

    return this.http.post<any>(url, body);
  }
}
