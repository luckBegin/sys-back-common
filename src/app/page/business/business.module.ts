import {NgModule} from '@angular/core' ;
import {NgZorroAntdModule} from 'ng-zorro-antd' ;
import {SharedModule} from '@shared/shared.module' ;
import {RouterModule, Routes} from '@angular/router' ;
import {BusinessManagerComponent} from "./manager/manager.component";

const routes: Routes = [
	{path: 'manager', component: BusinessManagerComponent, data: {title: '销售经理配置'}},
];

const component = [
	BusinessManagerComponent
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
export class BusinessModule {
}
