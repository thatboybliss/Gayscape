import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AppService } from './services/app.service';
import { LoginComponent } from './screens/login.component';
import { PulseComponent } from './screens/pulse.component';
import { ClubhousesComponent } from './screens/clubhouses.component';
import { ChatComponent } from './screens/chat.component';
import { ProfileComponent } from './screens/profile.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [
    MatIconModule,
    LoginComponent,
    PulseComponent,
    ClubhousesComponent,
    ChatComponent,
    ProfileComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  appService = inject(AppService);
}
