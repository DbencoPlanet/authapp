import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_service/user.service';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [MaterialModule, RouterLink, FormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css',
})
export class ForgetpasswordComponent implements OnInit {
  username = '';
  regresponse!: any;
  _response: any;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private service: UserService
  ) {}

  ngOnInit(): void {}

  Proceed() {
    this.service.Forgetpassword(this.username).subscribe((item) => {
      this._response = item;

      if (this._response.result == 'pass') {
        this.toastr.success(
          'OTP sent to the registered email.',
          'Forget Password'
        );
        this.service._username.set(this.username);

        this.router.navigateByUrl('/updatepassword');
      } else {
        this.toastr.error(
          'Failed due to:' + this._response.message,
          'Forget Password Failed'
        );
      }
    });
  }
}
