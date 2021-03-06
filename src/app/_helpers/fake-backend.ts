﻿import { Injectable } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { HttpClient, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';
import 'rxjs/add/operator/map';


import { Team } from '../_models/index';
import { Season } from '../_models/index';
import { Weather } from '../_models/index';

import { ServerService } from '../_services/index';






@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {



    constructor(
        private http: HttpClient,
        private serverService: ServerService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // array in local storage for registered users
        const users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        const locations: any[] = JSON.parse(localStorage.getItem('locations')) || [];

        // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
                // find if any user matches login credentials
                const filteredUsers = users.filter(user => {
                    return user.username === request.body.username && user.password === request.body.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    const user = filteredUsers[0];
                    const body = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: 'fake-jwt-token'
                    };
                    console.log('Username or password is correct');


                    console.log('...fetching 2016_full_game_schedule.json');
                    this.http.get<Season>('./assets/fake-backend.assets/data/2016_full_game_schedule.json')
                    .subscribe(season => {
                        localStorage.setItem('season', JSON.stringify(season));
                        console.log('...added season to local storage');
                    });


                    console.log('...fetching teams.json');
                    this.http.get<Array<Team>>('./assets/fake-backend.assets/data/teams.json')
                    .subscribe(teams => {
                        localStorage.setItem('teams', JSON.stringify(teams));
                        console.log('...added teams to local storage');
                    });


                    console.log('...fetching RESTful API');
                    this.http.get<Array<Team>>('./assets/fake-backend.assets/data/teams.json')
                    .subscribe(teams => {

                        teams.forEach(team => {

                            this.serverService.getWeather(team.Stadium.Zip)
                            .subscribe(weather => {
                                const entry = {
                                    zip: team.Stadium.Zip,
                                    weather: weather
                                };
                                locations.push(entry);
                                localStorage.setItem('locations', JSON.stringify(locations));
                                console.log('...added weather to localStorage.locations');
                                // console.log(weather);
                            });
                        });

                    });

                    return Observable.of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return Observable.throw('Username or password is incorrect');
                }
            }

            // get users
            if (request.url.endsWith('/api/users') && request.method === 'GET') {
                // tslint:disable-next-line:max-line-length
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return Observable.of(new HttpResponse({ status: 200, body: users }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorized');
                }
            }

            // get user by id
            if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'GET') {
                // tslint:disable-next-line:max-line-length
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    const urlParts = request.url.split('/');
                    const id = parseInt(urlParts[urlParts.length - 1], 0);
                    const matchedUsers = users.filter(_user => _user.id === id);
                    const user = matchedUsers.length ? matchedUsers[0] : null;

                    return Observable.of(new HttpResponse({ status: 200, body: user }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorized');
                }
            }

            // create user
            if (request.url.endsWith('/api/users') && request.method === 'POST') {
                // get new user object from post body
                const newUser = request.body;

                // validation
                const duplicateUser = users.filter(user => user.username === newUser.username ).length;
                if (duplicateUser) {
                    return Observable.throw('Username "' + newUser.username + '" is already taken');
                }

                // save new user
                newUser.id = users.length + 1;
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));

                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 }));
            }

            // delete user
            if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'DELETE') {
                // tslint:disable-next-line:max-line-length
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    // find user by id in users array
                    const urlParts = request.url.split('/');
                    const id = parseInt(urlParts[urlParts.length - 1], 0);
                    for (let i = 0; i < users.length; i++) {
                        const user = users[i];
                        if (user.id === id) {
                            // delete user
                            users.splice(i, 1);
                            localStorage.setItem('users', JSON.stringify(users));
                            break;
                        }
                    }

                    // respond 200 OK
                    return Observable.of(new HttpResponse({ status: 200 }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorized');
                }
            }


            // SERVER TEAMS DATA
            if (request.url.endsWith('/api/teams') && request.method === 'GET') {
                // tslint:disable-next-line:max-line-length
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return Observable.of(new HttpResponse({
                        status: 200,
                        body: JSON.parse(localStorage.getItem('teams')) || []
                    }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorized');
                }
            }

            // SERVER SEASON DATA
            if (request.url.endsWith('/api/season') && request.method === 'GET') {
                // tslint:disable-next-line:max-line-length
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    return Observable.of(new HttpResponse({
                        status: 200,
                        body: JSON.parse(localStorage.getItem('season')) || []
                    }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorized');
                }
            }

            // SERVER WEATHER DATA
            if (request.url.match(/\/api\/weather\/\d+$/) && request.method === 'GET') {
                // tslint:disable-next-line:max-line-length
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    const urlParts = request.url.split('/');
                    const zip = urlParts[urlParts.length - 1];

                    const weatherlocations = JSON.parse(localStorage.getItem('locations')) || [];
                    const location = weatherlocations.filter(loc => {
                        return loc.zip === zip;
                    });
                    const weather = location[0];

                    return Observable.of(new HttpResponse({
                        status: 200,
                        body: weather
                    }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorized');
                }
            }

            // RESTful API
            if (request.url.match(/\/server\/weather\/\d+$/) && request.method === 'GET') {
                // tslint:disable-next-line:max-line-length
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === 'Bearer fake-jwt-token') {

                    const urlParts = request.url.split('/');
                    const zip = urlParts[urlParts.length - 1];


                    const apiKey = 'b846da4e2a007c56d9dda9694376f2b2';
                    const countrycode = 'us';

                    const apiURL = (
                        'http://api.openweathermap.org/data/2.5/weather?zip='
                        + zip
                        + ','
                        + countrycode
                        + '&APPID='
                        + apiKey);

                    const _headers = new HttpHeaders();

                    request = request.clone({
                        url: apiURL,
                        method: 'GET',
                        headers: _headers
                    });

                    return next.handle(request);
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorized');
                }
            }




            // pass through any requests not handled above
            return next.handle(request);
        })

        // call materialize and dematerialize to ensure delay even if an error is thrown
        // (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .materialize()
        .delay(250)
        .dematerialize();
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
