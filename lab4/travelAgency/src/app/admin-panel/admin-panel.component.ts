import { Component, OnInit } from '@angular/core';
import firebase from 'firebase';
import { AuthService } from '../services/auth.service';
import { WebsiteUser } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  public users: Array<WebsiteUser> = [];
  public roles = ["Reader", "VIP", "Employee", "Admin"]
  constructor(private _authenticationService: AuthService, private _userService: UserService) { 
    this.getAllAccounts()
  }

  ngOnInit(): void {
  }

  changeActive(event: Event, mode: string){
    event.preventDefault();
    // let list = (<HTMLElement>event.currentTarget).parentNode;
    // this.resetList(list);
    // (<HTMLElement>event.currentTarget).classList.add("active")
    this._authenticationService.changePersistence(mode);
    if(mode === 's'){
      alert("Zmieniles tryb na SESSION")
    }else if(mode === 'n'){
      alert("Zmieniles tryb na NONE")
    }
    else{
      alert("Zmieniles tryb na LOCAL")
    }
  }

  // Debugging Nedded 10.03.2021
  getAllAccounts(){
    console.log(this.users);
    
    this.users = [];
    var i = 1;
    var fireList = this._userService.getUsers()
    var adminUID = firebase.auth().currentUser.uid
    fireList.snapshotChanges().forEach(changes => {
      changes.forEach(c => {
        if (c.payload.key != adminUID){
          console.log(i++);
          
          var user = <WebsiteUser>c.payload.val();
          user.uid = c.payload.key;
          this.users = [...this.users, user]
        }
      })
    })
  }

  update(user: WebsiteUser, val: string){
    var newRole = parseInt(val);
    user.role = newRole;
    this._userService.updateUser(user.uid, user)
    this.getAllAccounts()    
  }

}
