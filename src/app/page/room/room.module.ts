import { NgModule } from '@angular/core' ;
import { NgZorroAntdModule } from 'ng-zorro-antd' ;
import { SharedModule } from '@shared/shared.module' ;
import { RouterModule , Routes } from '@angular/router' ;
import { RoomTypeComponent } from './type/type.component';
import { RoomAreaComponent } from './area/area.component';
import { RoomListComponent } from './list/list.component';

const routes: Routes = [
    { path: 'type', component: RoomTypeComponent, data: { title: '房台类型配置' }} ,
    { path: 'area', component: RoomAreaComponent, data: { title: '房台区域配置' }} ,
    { path: 'list', component: RoomListComponent, data: { title: '房台列表配置' }} ,
];

const component = [
    RoomTypeComponent ,
    RoomAreaComponent ,
    RoomListComponent
];

@NgModule({
    declarations: [
        ...component,
    ],
    imports: [
        SharedModule,
        NgZorroAntdModule,
        RouterModule.forChild(routes),
    ],
    providers: [],
    bootstrap: [],
})
export class RoomModule {
}
