import { NgModule } from '@angular/core' ;
import { NgZorroAntdModule } from 'ng-zorro-antd' ;
import { SharedModule } from '@shared/shared.module' ;
import { RouterModule , Routes } from '@angular/router' ;
import {GoodsClassifyComponent} from "./classify/classify.component";
import {GoodsSubClassifyComponent} from "./sub-classify/sub-classify.component";
import {GoodsChildClassifyComponent} from './child-classify/child-classify.component';

const routes: Routes = [
	{ path: 'classify', component: GoodsClassifyComponent, data: { title: '商品分类设置'} },
	{ path: 'subClassify', component: GoodsSubClassifyComponent, data: { title: '商品子分类设置'} },
	{ path: 'childClassify', component: GoodsChildClassifyComponent, data: { title: '商品项目设置'} },
];

const component = [
	GoodsClassifyComponent,
	GoodsSubClassifyComponent,
	GoodsChildClassifyComponent
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
export class GoodsModule {
}
