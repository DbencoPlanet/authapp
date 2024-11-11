import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.production';
import {
  userregister,
  registerconfirm,
  usercred,
  loginresp,
  menu,
  resetpassword,
  updatepassword,
  menupermission,
  users,
} from '../_model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  baseUrl = environment.apiUrl;

  _registerresp = signal<registerconfirm>({
    userid: 0,
    username: '',
    otptext: '',
  });

  _menulist = signal<menu[]>([]);

  _username = signal('');

  Userregistration(_data: userregister) {
    return this.http.post(this.baseUrl + 'User/userregisteration', _data);
  }

  Confirmregistration(_data: registerconfirm) {
    return this.http.post(this.baseUrl + 'User/confirmregisteration', _data);
  }

  Proceedlogin(_data: usercred) {
    return this.http.post<loginresp>(
      this.baseUrl + 'Authorize/GenerateToken',
      _data
    );
  }

  Loadmenubyrole(role: string) {
    return this.http.get<menu[]>(
      this.baseUrl + 'UserRole/GetAllMenusbyrole?userrole=' + role
    );
  }

  Resetpassword(_data: resetpassword) {
    return this.http.post(this.baseUrl + 'User/resetpassword', _data);
  }

  Forgetpassword(username: string) {
    return this.http.get<menu[]>(
      this.baseUrl + 'User/forgetpassword?username=' + username
    );
  }

  Updatepassword(_data: updatepassword) {
    return this.http.post(this.baseUrl + 'User/updatepassword', _data);
  }

  Getmenupermission(role: string, menuname: string) {
    return this.http.get<menupermission>(
      this.baseUrl +
        'UserRole/GetMenupermissionbyrole?userrole=' +
        role +
        '&menucode=' +
        menuname
    );
  }

  Getallusers() {
    return this.http.get<users[]>(this.baseUrl + 'User/GetAll');
  }
}
