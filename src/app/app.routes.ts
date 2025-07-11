import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ServicesComponent } from './pages/services/services';
import { BookingComponent } from './pages/booking/booking';
import { ContactComponent } from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' } // Catch-all fallback
];