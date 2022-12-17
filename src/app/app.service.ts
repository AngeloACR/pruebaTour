import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  source: string = 'https://alternos.sgc-consultores.com.ve/pruebatour';

  constructor(private http: HttpClient) {}

  postData(nombre: string, nombreArchivo: string, archivo: File) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'multipart/form-data');

    let endpoint = `${this.source}/registro`;
    let body = new FormData();
    body.append('nombre', nombre);
    body.append('nombreArchivo', nombreArchivo);
    body.append('ruta', './archivos/');
    body.append('archivo', archivo);
    return this.http.post(endpoint, body, { headers: headers });
  }
  getData(nombre: string) {
    let headers = new HttpHeaders();
    let endpoint = `${this.source}/consulta?nombre=${nombre}`;
    return this.http.get(endpoint, { headers: headers });
  }
}
