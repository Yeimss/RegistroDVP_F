import Swal from 'sweetalert2'
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder:FormBuilder, private usersServices:UsersService){}
  public formRegister: FormGroup = new FormGroup({});
  public data:any;
  ngOnInit(): void {
    this.initialiceForm()
  }
  save(){
    if (this.formRegister.valid) {
      this.usersServices.insertPerson(this.formRegister.value).subscribe({
        next: result =>{
          this.data = result;
          if(this.data.success){
            this.alerta("Exito!","Exito registrando el usuario", "");
            this.formRegister.reset();
          }else{
            this.alerta("Error!","Error registrando el usuario", "warning");
          }
        }
      }
      );
    }else{
      this.alerta("Error!","Por favor ingrese todos los datos","warning")
    }
  }
  alerta(titulo:string, msj:string, icono:string = "warning", time:number = 1000){
    
    Swal.fire({
      icon: icono == "warning" ? icono : "success",
      title: titulo,
      text: msj,
    });
  }
  initialiceForm(){
    this.formRegister = this.formBuilder.group({
      Nombres: ['', [Validators.required]],
      Apellidos: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      NumeroIdentificacion: ['', [Validators.required]],
      TipoIdentificacion: ['', [Validators.required]],
      Usuario: ['', [Validators.required]],
      Pass: ['', [Validators.required]],
    });
  }
}
