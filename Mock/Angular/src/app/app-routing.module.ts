import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FilmComponent } from './film/film.component';
import { ActorComponent } from './actor/actor.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectorComponent } from './director/director.component';
import { TypeComponent } from './type/type.component';
import { UserManagementComponent} from './user-management/user-management.component';
import { ProfileComponent } from './user-management/profile/profile.component';


const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'user',
    component: UserManagementComponent
  },
  {
    path: 'type',
    component: TypeComponent
  },
  {
    path: 'director',
    component : DirectorComponent
  },
   {
    path: 'actor',
    component: ActorComponent
  },
  {
    path: 'film',
    component: FilmComponent
  },
  {
    path: 'home',
    component: AppComponent
  },
  {
    path: '',
    component: FilmComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
