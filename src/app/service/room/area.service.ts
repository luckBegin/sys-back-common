import { Injectable } from '@angular/core';
import { API } from '../API';
import { HttpClient } from '@angular/common/http';
import { MsgService } from '../msg/msg.service';
import { GET, DELETE, POST, PUT } from '../../../decorators/request.decorator';
import { Observable } from 'rxjs';
import { RESPONSE } from '../../models';

@Injectable({ providedIn: 'root' })
export class RoomAreaService {
	constructor(
		private http: HttpClient,
		private msg: MsgService,
	) {
	}

	@GET(API.room.area)
	get(obj ?: Object): any | Observable< RESPONSE > {};

	@POST(API.room.area)
	post(data: object): any | Observable< RESPONSE > {};

	@DELETE(API.room.area)
	delete(data: any): any | Observable< RESPONSE > {}

	@PUT(API.room.area)
	put(data: object): any | Observable< RESPONSE > {};
}
