import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotAuthGuard } from './guards/index';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule', canActivate: [NotAuthGuard] },
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule'},
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule'},
  { path: 'confirm', loadChildren: './confirm-email/confirm-email.module#ConfirmEmailPageModule'},
  { path: 'admin-panel', loadChildren: './admin-panel/admin-panel.module#AdminPanelPageModule', canActivate: [NotAuthGuard] },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule', canActivate: [NotAuthGuard] }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
