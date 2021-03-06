import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdminPanelPage } from './admin-panel.page';
import { TripledotsPipe } from '../../../shared/pipes/tripledots.pipe';

const routes: Routes = [
  {
    path: '',
    component: AdminPanelPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminPanelPage, TripledotsPipe]
})
export class AdminPanelPageModule {}
