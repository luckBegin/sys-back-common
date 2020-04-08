import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MsgService} from "..";
import {DELETE, GET, POST, PUT} from '../../../decorators/request.decorator';
import {API} from '../API';

@Injectable({providedIn: 'root'})
export class GoodsChildClassifyService {
	constructor(
		private readonly http: HttpClient ,
		private readonly msg: MsgService
	){}

	@GET(API.goods.childClassify)
	get(obj ?: Object): any {
	};

	@POST(API.goods.childClassify, false)
	post(data: object): any {
	};

	@DELETE(API.goods.childClassify)
	delete(data: any): any {
	}

	@PUT(API.goods.childClassify)
	put(data: object): any {
	};
}
