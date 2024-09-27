import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**Material dependences */
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule} from '@angular/material/badge';
@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: 
  [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  badgevisible = false;
  badgevisibility() {
    this.badgevisible = true;
  }
}
