import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-comments',
  imports: [MaterialModule, RouterModule],
  templateUrl: './comments.component.html',
 styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {

}