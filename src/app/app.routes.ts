import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { Layout } from './pages/layout/layout';


export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/login',
        pathMatch: 'full',
        
    },
    {
        path: '',
        component: Layout,
        children: [
            {
            path: 'login',
            component: LoginComponent
            },
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/dashboard/dashboard').then(mod => mod.Dashboard)
            },
            {
                path: 'cart',
                loadComponent: () => import('./pages/cart/cart').then(mod => mod.Cart)
            },
            {
                path: 'my-items',
                loadComponent: () => import('./pages/my-items/my-items').then(mod => mod.MyItems)
            }
        ]
    }
    
 
];
