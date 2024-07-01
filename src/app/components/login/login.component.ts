import Swal from 'sweetalert2'
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private formBuilder:FormBuilder, private usersServices : UsersService,  private router:Router){}
  public formLogin: FormGroup = new FormGroup({});
  public data: any;
  
  ngOnInit(): void {
    this.initialiceForm()
  }

  login(){
    if (this.formLogin.valid) {
      this.usersServices.getUser(this.formLogin.value).subscribe({
        next: result =>{
          this.data = result;
          if(this.data.success){
            this.alerta("Exito!", this.data.message, "");
            this.router .navigateByUrl('/home');
            this.usersServices.setUser(this.data.data)
            this.formLogin.reset();
          }else{
            this.alerta("Error!",this.data.message, "warning");

          }
        },
        error: err => {
          this.data = err;
          this.alerta("Error!",this.data.error.message, "warning");
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
    this.formLogin = this.formBuilder.group({
      Usuario: ['', [Validators.required]],
      Pass: ['', [Validators.required]],
    });
  }
}
