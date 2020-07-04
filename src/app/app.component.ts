import { Component } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Prueba Angular';
  mensajeAlerta = '';
  hayAlerta = false;
  hayExito = false;
  restcountries = [];
  formdata;
  generos = ['Prefiero no especificar','Masculino', 'Femenino'];

  constructor(){
    fetch("https://restcountries.eu/rest/v2/all")
      .then(response => response.json())
      .then(result => {
          this.restcountries = result
          console.log(this.restcountries);
      })
      .catch(error => console.log('error', error));
  }
  ngOnInit() {
    this.formdata = new FormGroup({
       nombre: new FormControl("",Validators.compose([Validators.required, Validators.pattern('[A-Za-z]{1,100}')])),
       apellido: new FormControl("",Validators.compose([Validators.required,  Validators.pattern('[A-Za-z]{1,100}')])),
       email: new FormControl("",Validators.compose([Validators.required, Validators.email])),
       pais: new FormControl("",Validators.compose([Validators.required])),
       genero: new FormControl("",Validators.compose([Validators.required])),
       telefono: new FormControl("",Validators.compose([
         Validators.required,
         Validators.minLength(10),
         Validators.pattern('[\(]{1}[0-9]{2}[\)]{1} [0-9]{3}-[0-9]{3}-[0-9]{2}')
        ]))
    });
 }

  onClickSubmit(data){
    let controles = data.controls;
    let errores = '';
    for(let index in controles){
      let input = controles[index];
      if(input.invalid){
        for(let indexerr in input.errors){
          errores += `Error en ${index}: ${JSON.stringify(indexerr)}<br>`
        }
      }
    }
    if(errores.length === 0){
      this.mostrarExito();
    }else{
      this.mostrarAlerta(errores);
    }
  }

  mostrarAlerta(msg){
    this.hayAlerta = true;
    this.mensajeAlerta = msg;
    setTimeout(()=>{this.hayAlerta = false; this.mensajeAlerta = ''},10000)
  }
  mostrarExito(){
    this.hayExito = true;
    setTimeout(()=>{this.hayExito = false; },10000)
  }
}
