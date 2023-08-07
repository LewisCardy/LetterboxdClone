import { NgModule } from '@angular/core';
import { HomePageComponent } from './home-page/home-page.component';
import { FilmsPageComponent } from './films-page/films-page.component';
import { ActorsPageComponent } from './actors-page/actors-page.component';
import { DirectorsPageComponent } from './directors-page/directors-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
      {path: '', redirectTo: 'Home', pathMatch: 'full'},
      {path: 'Home', component: HomePageComponent},
      {path: 'Films', component: FilmsPageComponent},
      {path: 'Actors', component: ActorsPageComponent},
      {path: 'Directors', component: DirectorsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
