import { Injectable } from '@angular/core';

@Injectable()
export class GeneralInterface {
    titleWindowPlatform?: string;
    namePlatform?: string;
    urlApi?: string;
    urlWebSocket?: string;

    constructor() {
        this.titleWindowPlatform = 'PRUEBA TSC';
        this.namePlatform = 'PRUEBA TSC';
        this.urlApi = 'http://localhost:3000';

    }

}




