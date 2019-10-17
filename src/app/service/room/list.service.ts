import { Injectable } from '@angular/core';
import { API } from '../API';
import { HttpClient } from '@angular/common/http';
import { MsgService } from '../msg/msg.service';
import { GET, DELETE, POST, PUT } from '../../../decorators/request.decorator';
import { Observable } from 'rxjs';
import { RESPONSE } from '../../models';

@Injectable({ providedIn: 'root' })
export class RoomListService {
    constructor(
        private http: HttpClient,
        private msg: MsgService,
    ) {
    }

    @GET(API.room.list)
    get(obj ?: Object): any | Observable< RESPONSE > {};

    @GET(API.room.list + '/all')
    getAll(obj ?: Object): any | Observable< RESPONSE > {};

    @POST(API.room.list)
    post(data: object): any | Observable< RESPONSE > {};

    @DELETE(API.room.list)
    delete(data: any): any | Observable< RESPONSE > {}

    @PUT(API.room.list)
    put(data: object): any | Observable< RESPONSE > {};
}
