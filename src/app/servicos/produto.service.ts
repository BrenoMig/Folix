import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto.model'; // Verifique se o caminho está correto

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'https://localhost:7258/api/'; 

  constructor(private http: HttpClient) {}

  // Método para obter a lista de produtos
  getProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl + 'produto'); 
  }

  // Método para finalizar a compra
  finalizarCompra(produtosComprados: Produto[]): Observable<void> {
    return this.http.post<void>(this.apiUrl + 'finalizar-compra', produtosComprados);
  }
}
