import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: 
  [CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  
}
