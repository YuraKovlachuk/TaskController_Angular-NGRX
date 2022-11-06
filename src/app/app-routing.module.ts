import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./feature/dashboard/dashboard.component";
import {AuthGuard} from "./guards/auth.guard";
import {Page404Component} from "./feature/page404/page404.component";

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], title: 'Dashboard - CTask'},
  {
    path: 'login',
    loadChildren: () => import('./feature/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./feature/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'board/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./feature/tasks/tasks.module').then(m => m.TasksModule)
  },
  {
    path: 'about',
    canActivate: [AuthGuard],
    title: 'Profile - CTask',
    loadChildren: () => import('./feature/user/user.module').then(m => m.UserModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    title: '404',
    component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
