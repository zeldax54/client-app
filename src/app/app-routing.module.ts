import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './guards/auth.guard ';
import { ConfigureComponent } from './configure/configure.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  //{ path: '**', redirectTo: '/home', pathMatch: 'full' }, // Ruta para manejar rutas no encontradas

  { path: '', component: AppLayoutComponent,canActivate: [AuthGuard],
    children:[{path: 'home',component:HomeComponent, canActivate: [AuthGuard]},]
  },

  { path: '', component: AppLayoutComponent,canActivate: [AuthGuard],
    children:[{path: 'configure',component:ConfigureComponent, canActivate: [AuthGuard]},]
  },


  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
