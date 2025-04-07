import { Component } from '@angular/core';
<<<<<<< HEAD
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-client-layout',
  imports: [HeaderComponent,FooterComponent,RouterOutlet],
=======
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-layout',
  imports: [HeaderComponent,FooterComponent,RouterModule],
>>>>>>> 5d29765af0f756f67b11f865a3a3f514fbd68d35
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.scss'
})
export class ClientLayoutComponent {

}
