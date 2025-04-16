import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from 'src/app/services/apis/user.service';
@Component({
  selector: 'app-edit-user',
  imports: [
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  fromData: FormGroup; 
  roleId: string; 
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.roleId = this.route.snapshot.paramMap.get('id')!;
    
    this.fromData = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      role: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['']
    });

    this.loadUser();
  }

  loadUser(): void {
    this.userService.getUserById(+this.roleId).subscribe({
      next: (res) => {
        // Chuyển role từ 'User' | 'Admin' thành '1' | '0'
        const mappedData = {
          ...res,
          role: res.role === 'Admin' ? '0' : '1' // hoặc ngược lại tùy backend bạn
        };
  
        this.fromData.patchValue(mappedData);
      },
      error: (err) => {
        console.error('Lỗi khi tải người dùng:', err);
      }
    });
  }
  

  onSubmit(): void {
    const updatedUser = {
      role: this.fromData.value.role,
    };
    this.userService.updateUser(+this.roleId, updatedUser).subscribe({
      next: (res) => {
        console.log('Cập nhật role thành công:', res);
        this.router.navigate(['/admin/users']);
      },
      error: (err) => {
        console.error('Lỗi khi cập nhật role:', err);
      }
    });
  }
 
}
