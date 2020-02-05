import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {MsgService} from "../../service/msg/msg.service";
import {DELETE, GET, POST, PUT} from '../../../decorators/request.decorator';
import {API} from '../API';
import {Observable} from "rxjs";
import {ENUM, RESPONSE} from "../../models";

@Injectable({providedIn: 'root'})
export class ManagerService {
    constructor(
        private readonly http: HttpClient ,
        private readonly msg: MsgService
    ){}

    @GET(API.business.manager)
    get(obj ?: Object): Observable<RESPONSE> | any {
    };

    @POST(API.business.manager, false)
    post(data: object): Observable<RESPONSE> | any {
    };

    @DELETE(API.business.manager)
    delete(data: any): Observable<RESPONSE> | any {
    }

    @PUT(API.business.manager)
    put(data: object): Observable<RESPONSE> | any {
    };

    static ENUM_Level: ENUM[] = [
        {key: '1' , value: 1} ,
        {key: '2' , value: 2} ,
        {key: '3' , value: 3} ,
        {key: '4' , value: 4} ,
        {key: '5' , value: 5} ,
        {key: '6' , value: 6} ,
        {key: '7' , value: 7} ,
        {key: '99' , value: 99} ,
    ]
}
