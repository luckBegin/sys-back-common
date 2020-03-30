import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MsgService} from "..";
import {DELETE, GET, POST, PUT} from '../../../decorators/request.decorator';
import {API} from '../API';
import {Observable} from 'rxjs';
import {RESPONSE} from '../../models';

@Injectable({providedIn: 'root'})
export class GoodsSubClassifyService {
	constructor(
		private readonly http: HttpClient ,
		private readonly msg: MsgService
	){}

	@GET(API.goods.subClassify)
	get(obj ?: Object): Observable< RESPONSE> | any  {
	};

	@POST(API.goods.subClassify, false)
	post(data: object): Observable< RESPONSE> | any  {
	};

	@DELETE(API.goods.subClassify)
	delete(data: any): Observable< RESPONSE> | any  {
	}

	@PUT(API.goods.subClassify)
	put(data: object): Observable< RESPONSE> | any  {
	};

	@GET(API.goods.classify + '/all')
	all(obj ?: Object): Observable< RESPONSE> | any {
	};
}
