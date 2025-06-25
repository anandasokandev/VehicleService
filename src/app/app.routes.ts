import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { BookingComponent } from './components/booking/booking.component';
import { BookingHistoryComponent } from './components/booking-history/booking-history.component';
import { UpcommingBookingComponent } from './pages/upcomming-booking/upcomming-booking.component';
import { ServiceCenterComponent } from './components/service-center/service-center.component';
import { authGuard } from './guard/auth.guard';
import { ViewBookingsComponent } from './components/view-bookings/view-bookings.component';
import { AdminBookingComponent } from './pages/admin/admin-booking/admin-booking.component';
import { VehicleSearchComponent } from './components/vehicle-search/vehicle-search.component';
import { AddVehicleComponent } from './components/add-vehicle/add-vehicle.component';
import { AdminBookingHistoryComponent } from './components/admin-booking-history/admin-booking-history.component';
import { AdminBookingViewComponent } from './pages/admin/admin-booking-view/admin-booking-view.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'dashboard',
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: 'service-center',
        component: ServiceCenterComponent
    },
    {
        path: 'add-vehicle',
        component: AddVehicleComponent
    },
    {
        path: 'booking',
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
    },
    {
        path: 'servicecenter',
        children: [
            {
                path: 'booking',
                children: [
                    {
                        path: 'viewbooking',
                        component: AdminBookingViewComponent
                    },
                    {
                        path: 'booking-history',
                       component: AdminBookingHistoryComponent
                    }
                ]
            }, 
            {
                path: 'vehicle-search',
                component: VehicleSearchComponent
            }
        ]
    }
];
