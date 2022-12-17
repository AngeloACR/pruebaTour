import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  nombre: string = '';
  nombreArchivo: string = '';
  archivo!: File;
  hayImagen: boolean = false;
  imgLink: string = '';
  constructor(private service: AppService) {}

  cambiarArchivo(event: Event) {
    let target = event.target! as HTMLInputElement;
    this.archivo = target.files![0];
    this.nombreArchivo = this.archivo.name;
  }

  enviar() {
    this.service
      .postData(this.nombre, this.nombreArchivo, this.archivo)
      .subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {},
      });
  }
  recibir() {
    this.service.getData(this.nombre).subscribe({
      next: (data: any) => {
        console.log(data);
        let ruta = data.ruta;
        !!ruta ? (this.imgLink = ruta) : '';
        this.hayImagen = true;
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
}
