import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from 'express';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmotp',
  standalone: true,
  imports: [MaterialModule, FormsModule, CommonModule],
  templateUrl: './confirmotp.component.html',
  styleUrl: './confirmotp.component.css',
})
export class ConfirmotpComponent {
  otptext = '';

  constructor(private toastr: ToastrService, private router: Router) {}
}
