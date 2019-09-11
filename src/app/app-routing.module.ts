import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotAuthGuard } from './modules/shared/guards/index';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'profile', loadChildren: 'modules/profile/profile/profile.module#ProfilePageModule' },
  { path: 'register', loadChildren: 'modules/auth/register/register.module#RegisterPageModule'},
  { path: 'login', loadChildren: 'modules/auth/login/login.module#LoginPageModule'},
  { path: 'confirm', loadChildren: 'modules/confirm-email/confirm-email.module#ConfirmEmailPageModule'},
  { path: 'admin-panel', loadChildren: 'modules/profile/admin-panel/admin-panel.module#AdminPanelPageModule', canActivate: [NotAuthGuard] },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule', canActivate: [NotAuthGuard] },
  { path: 'cart', loadChildren: './cart/cart.module#CartPageModule',  canActivate: [NotAuthGuard]  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
