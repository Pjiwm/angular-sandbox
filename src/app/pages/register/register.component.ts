import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newUserName: string
  newEmail: string
  newPassword: string
  user: User
  constructor(private authService: AuthService) { 
    this.newUserName = ""
    this.newEmail = ""
    this.newPassword = ""
    this.user = {userName: this.newUserName, email: this.newEmail, password: this.newPassword, id: 0}
  }

  ngOnInit(): void {
  }
  
  onSubmit(): void {
    this.user = {userName: this.newUserName, email: this.newEmail, password: this.newPassword, id: 0}
    this.authService.register(this.user)
  }

}
