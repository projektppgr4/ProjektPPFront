﻿import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';
import {Task} from "../_models/task";

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('http://localhost:8080/api/users', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post('http://localhost:8080/api/users', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('http://localhost:8080/api/users' + id, this.jwt()).map((response: Response) => response.json());
    }

    assignTask(userId: number, task: Task) {
      return this.http.post('http://localhost:8080/api/user' + userId + '/task', task, this.jwt()).map((response: Response) => response.json());
    }

    // private helper methods

    private jwt() {
      // create authorization header with jwt token
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if ( currentUser) {
        let headers = new Headers;
        headers.append('Authorization', 'Basic ' + btoa(currentUser.ssoId + ':' + currentUser.password));
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Content-Type', 'application/json');
        return new RequestOptions({headers: headers});
      }
    }
}
