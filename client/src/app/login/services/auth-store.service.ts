import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthStoreService {
    constructor() { }

    setAuthToken(token) {
        window.localStorage.setItem('token', token);
    }
    getAuthToken() {
        return window.localStorage.getItem('token');
    }
}