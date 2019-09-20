import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { UnauthorizedGuard, AuthorizedGuard } from '../shared/guards';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'main-tab',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./main-tab/main-tab.module').then(m => m.MainPageModule)
          }
        ]
      },
      {
        path: 'login',
        canActivate: [UnauthorizedGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./auth/login/login.module').then(m => m.LoginPageModule)
          }
        ]
      },
      {
        path: 'cart',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./cart/cart.module').then(m => m.CartPageModule)
          }
        ]
      },
      {
        path: 'chat',
        canActivate: [AuthorizedGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./chat/chat.module').then(m => m.ChatPageModule)
          }
        ]
      },
      {
        path: 'register',
        canActivate: [UnauthorizedGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./auth/register/register.module').then(m => m.RegisterPageModule)
          }
        ]
      },
      {
        path: 'profile',
        canActivate: [AuthorizedGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./profile/profile/profile.module').then(m => m.ProfilePageModule)
          }
        ]
      },
      {
        path: 'confirm/:code',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./confirm-email/confirm-email.module').then(m => m.ConfirmEmailPageModule)
          }
        ]
      },
      {
        path: 'admin-panel',
        canActivate: [AuthorizedGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./profile/admin-panel/admin-panel.module').then(m => m.AdminPanelPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/main-tab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/main-tab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
