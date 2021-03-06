import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UnauthorizedGuard } from './modules/shared/guards';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'profile', loadChildren: './modules/tabs/profile/profile/profile.module#ProfilePageModule' },
  { path: 'register', loadChildren: './modules/tabs/auth/register/register.module#RegisterPageModule'},
  { path: 'login', loadChildren: './modules/tabs/auth/login/login.module#LoginPageModule'},
  { path: 'confirm', loadChildren: './modules/tabs/confirm-email/confirm-email.module#ConfirmEmailPageModule'},
  {
    path: 'admin-panel',
    loadChildren: './modules/tabs/profile/admin-panel/admin-panel.module#AdminPanelPageModule',
  },
  { path: 'chat', loadChildren: './modules/tabs/chat/chat.module#ChatPageModule', },
  { path: 'chat/:id', loadChildren: './modules/tabs/chat/chat.module#ChatPageModule' },
  { path: 'cart', loadChildren: './modules/tabs/cart/cart.module#CartPageModule',  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
