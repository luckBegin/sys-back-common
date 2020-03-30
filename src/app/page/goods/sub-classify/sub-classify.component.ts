import { Component , OnInit } from '@angular/core';
import {MsgService} from "../../../service";
import {DateUtils} from '@shared/utils';
import { QueryModel } from './query.model'
import {RESPONSE} from '../../../models';
import {GoodsClassifyService} from '../../../service/goods';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Service} from '../../../../decorators/service.decorator';
@Component({
	selector: 'goods-classify' ,
	templateUrl: './sub-classify.component.html',
	styleUrls: ['./sub-classify.component.less']
})
export class GoodsSubClassifyComponent implements OnInit{
	constructor(
		private readonly msg: MsgService,
		private readonly service: GoodsClassifyService,
		private readonly fb: FormBuilder
	){}

	ngOnInit(): void {
		this.getList() ;
	}

	private queryModel: QueryModel = new QueryModel ;
	public isVisible: boolean = false ;
	public infoBoxShow: boolean = false ;
	public editMark: boolean = false ;

	public tableData = {
		loading: true,
		page: 1,
		total: 0,
		columns: [
			{ title: '名称', type: 'text', reflect: 'name' },
			{ title: '备注', type: 'text', reflect: 'remark' },
			{ title: '店铺', type: 'text', filter: val => val.shopInfo.name },
			{ title: "创建时间" , type: 'text' , filter: ( val ) => {
				return DateUtils.format( val.createTime , 'y-m-d') ;
			}},
		],
		data: [],
		btn: {
			title: '操作',
			items: [{
				type: 'edit',
				title: '编辑',
				fn: (data) => {
					this.form.patchValue( data ) ;
					this.editMark = true ;
					this.infoBoxShow = true ;
				}},{
				type: 'del',
				title: '删除',
				fn: (data) => {
					this.isVisible = true;
					this.form.patchValue(data);
				}}
			],
		},
		change: (type: string, size: number) => {
			if ( type === 'size' )
				this.queryModel.pageSize = size;
			if ( type === 'page' ) {
				this.tableData.page = size;
				this.queryModel.currentPage = size;
			}
			this.getList()
		},
	};

	public getList(): void{
		this.tableData.loading = true ;
		this.service.get( this.queryModel )
			.subscribe((res: RESPONSE) => {
				this.tableData.data = res.data ;
				this.tableData.loading = false;
				if(res.page)
					this.tableData.total = res.page.totalNumber ;
			},err => {
				this.tableData.loading = false ;
				this.msg.error( err ) ;
			});
	};

	public add(): void{
		this.form.reset() ;
		this.infoBoxShow = !this.infoBoxShow ;
		this.editMark = false ;
	};

	public form: FormGroup = this.fb.group({
		name : [ null , [ Validators.required ]],
		remark : [ null ] ,
		id : [ null ]
	});

	@Service('service.delete', true, function(){
		return (this as GoodsSubClassifyComponent).form.value ;
	})
	modalConfirm($event: Event) {
		this.msg.success('删除成功');
		this.isVisible = false;
		this.getList() ;
	};

	@Service("service.post" , true , function(){
		return (this as GoodsSubClassifyComponent).form.value ;
	})
	makeNew( $event : MouseEvent ): void{
		this.msg.success("添加成功") ;
		this.infoBoxShow = false ;
		this.getList();
	};

	@Service("service.put" , true , function(){
		return (this as GoodsSubClassifyComponent).form.value ;
	})
	save( $event : MouseEvent ): void{
		this.msg.success("修改成功");
		this.infoBoxShow = false ;
		this.getList() ;
	};
}
