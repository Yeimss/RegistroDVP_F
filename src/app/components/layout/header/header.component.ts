import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(public userService:UsersService){}
  public nombreCompleto = "";
 
  ngOnInit() {
    this.getFullName();
  }

  getFullName (){
    let info = this.userService.getLoginInfo();
    if(info != ""){
      this.nombreCompleto = info[0].nombreCompleto;
    }
  }

  Logout(){
    this.userService.logout();
  }
}
