import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MsgService} from "..";
import {DELETE, GET, POST, PUT} from '../../../decorators/request.decorator';
import {API} from '../API';

@Injectable({providedIn: 'root'})
export class GoodsClassifyService {
	constructor(
		private readonly http: HttpClient ,
		private readonly msg: MsgService
	){}

	@GET(API.goods.classify)
	get(obj ?: Object): any {
	};

	@POST(API.goods.classify, false)
	post(data: object): any {
	};

	@DELETE(API.goods.classify)
	delete(data: any): any {
	}

	@PUT(API.goods.classify)
	put(data: object): any {
	};
}
