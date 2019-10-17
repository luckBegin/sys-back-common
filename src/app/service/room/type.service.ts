import { Injectable } from '@angular/core';
import { API } from '../API';
import { HttpClient } from '@angular/common/http';
import { MsgService } from '../msg/msg.service';
import { GET, DELETE, POST, PUT } from '../../../decorators/request.decorator';
import { Observable } from 'rxjs';
import { RESPONSE } from '../../models';

@Injectable({ providedIn: 'root' })
export class RoomTypeService {
	constructor(
		private http: HttpClient,
		private msg: MsgService,
	) {
	}

	@GET(API.room.type)
	get(obj ?: Object): any | Observable< RESPONSE > {};

	@POST(API.room.type)
	post(data: object): any | Observable< RESPONSE > {};

	@DELETE(API.room.type)
	delete(data: any): any | Observable< RESPONSE > {}

	@PUT(API.room.type)
	put(data: object): any | Observable< RESPONSE > {};
}
