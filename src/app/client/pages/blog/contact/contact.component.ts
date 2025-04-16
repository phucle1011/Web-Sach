import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactInfo = {
    address: 'Toà nhà FPT Polytechnic, phường Thường Thạnh, quận Cái Răng, TP Cần Thơ;',
    email: 'phuc628780gmail.com',
    phone: '+ 0379 169 731'
  };
}
