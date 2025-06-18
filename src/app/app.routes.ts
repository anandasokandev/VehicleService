import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { BookingComponent } from './components/booking/booking.component';
import { BookingHistoryComponent } from './components/booking-history/booking-history.component';
import { UpcommingBookingComponent } from './pages/upcomming-booking/upcomming-booking.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'dashboard',
        component: HomeComponent
    },
    {
        path:'booking',
        children: [
            {
                path: 'currentbooking',
                component: UpcommingBookingComponent
            },
            {
                path: 'newbooking',
                component: BookingComponent
            },
            {
                path: 'bookinghistory',
                component: BookingHistoryComponent
            }
        ]
    }
];
