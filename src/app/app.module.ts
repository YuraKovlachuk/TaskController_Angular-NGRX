import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {RegisterModule} from "./feature/register/register.module";
import {LoginModule} from "./feature/login/login.module";
import {SharedModule} from "./shared/shared.module";
import {DashboardModule} from "./feature/dashboard/dashboard.module";
import {HttpClientModule} from "@angular/common/http";
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {AuthEffects} from "./state/auth/auth.effects";
import {appReducer, metaReducers} from "./state/app.state";
import {BoardEffects} from "./state/board/board.effects";
import {Page404Module} from "./feature/page404/page404.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TasksModule} from "./feature/tasks/tasks.module";
import {TaskEffects} from "./state/task/task.effects";
import {UserModule} from "./feature/user/user.module";
import {UserEffects} from "./state/user/user.effects";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    RegisterModule,
    LoginModule,
    SharedModule,
    DashboardModule,
    TasksModule,
    UserModule,
    Page404Module,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(appReducer,
      {
        metaReducers,
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true
        }
      }),
    EffectsModule.forRoot([AuthEffects, BoardEffects, TaskEffects, UserEffects]),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
