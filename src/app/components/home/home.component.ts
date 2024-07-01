import { Component } from '@angular/core';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(public userService:UsersService){}
  public nombreCompleto = "";
 
  ngOnInit(): void {
    this.nombreCompleto = "HI";
    this.getFullName();
  }

  getFullName (){
    let info = this.userService.getLoginInfo();
    if(info != ""){
      this.nombreCompleto = info[0].nombreCompleto;
    }
  }

}
