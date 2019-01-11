import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule} from 'ngx-pagination';

const ActorRoutes: Routes = [

];

@NgModule({
  imports: [RouterModule.forRoot(ActorRoutes)],
  exports: [RouterModule, NgxPaginationModule]
})

export class ActorRoutingModule { }
