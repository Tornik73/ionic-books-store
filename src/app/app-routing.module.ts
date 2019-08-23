import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotAuthGuard } from './guards/not-auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule'},
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule'},
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule'},
  { path: 'confirm', loadChildren: './confirm-email/confirm-email.module#ConfirmEmailPageModule'},
  { path: 'admin-panel', loadChildren: './admin-panel/admin-panel.module#AdminPanelPageModule'}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
