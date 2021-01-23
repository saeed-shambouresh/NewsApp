import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard.guard';
import { LoginComponent } from './login/login.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsComponent } from './news/news.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewsRouteResolver } from './resolver/newsRoute.resolver';

const routes: Routes = [
  { path: 'NotFound', component: NotFoundComponent },
  { path: 'Login', component: LoginComponent },
  {
    path: 'News', component: NewsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'News/:id', component: NewsDetailComponent, canActivate: [AuthGuard],
    resolve: { data: NewsRouteResolver },
    data: { resolvedata: 'myValue' }

  },
  { path: '', redirectTo: '/News', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
