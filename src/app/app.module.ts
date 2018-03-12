import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/index';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { JwtInterceptor } from './_helpers/index';

import {
    AlertService,
    AuthenticationService,
    UserService,
    TeamService,
    GameScheduleService } from './_services/index';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { WeatherComponent } from './weather/weather.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GamePipe } from './_pipes/game.pipe';



@NgModule({
    imports: [
        NgbModule.forRoot(),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        WeatherComponent,
        GamePipe
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        TeamService,
        GameScheduleService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        // post-authorization

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
