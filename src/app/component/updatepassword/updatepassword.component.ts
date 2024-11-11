import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { updatepassword } from '../../_model/user.model';

@Component({
  selector: 'app-updatepassword',
  standalone: true,
  imports: [MaterialModule, RouterLink, ReactiveFormsModule],
  templateUrl: './updatepassword.component.html',
  styleUrl: './updatepassword.component.css',
})
export class UpdatepasswordComponent implements OnInit {
  customerusername = '';

  _resetform: any;
  _response: any;

  constructor(
    private builder: FormBuilder,
    private service: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this._resetform = this.builder.group({
      password: this.builder.control('', Validators.required),
      otptext: this.builder.control('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.customerusername = this.service._username();
  }

  proceedchange() {
    if (this._resetform.valid) {
      let _obj: updatepassword = {
        username: this.customerusername,
        password: this._resetform.value.newpassword as string,
        otptext: this._resetform.value.oldpassword as string,
      };
      this.service.Updatepassword(_obj).subscribe((item) => {
        this._response = item;
        if (this._response.result == 'pass') {
          this.toastr.success(
            'Please login with new password',
            'Password changed'
          );
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.error(
            'Failed due to:' + this._response.message,
            'Reset Password Failed'
          );
        }
      });
    }
  }
}
