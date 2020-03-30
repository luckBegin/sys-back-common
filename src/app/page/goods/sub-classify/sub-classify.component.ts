import { Component , OnInit } from '@angular/core';
import {MsgService} from "../../../service";
import {AdaptorUtils, DateUtils} from '@shared/utils';
import { QueryModel } from './query.model'
import {ENUM, RESPONSE} from '../../../models';
import {GoodsClassifyService, GoodsSubClassifyService} from '../../../service/goods';
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
		private readonly service: GoodsSubClassifyService,
		private readonly classifySer: GoodsClassifyService ,
		private readonly fb: FormBuilder
	){}

	ngOnInit(): void {
		this.getList() ;
		this.enums() ;
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
			{ title: '所属类目', type: 'text', filter: val => {
				const item = this.enum_classify.find( item => item.value === val.classifyId.toString() ) ;
				return item ? item.key : '未知' ;
			}},
			{ title: '是否电子券用品', type: 'text', filter: (val) => val.isCoupon === 1? "是" : "否"  },
			{ title: '是否计入销售经理业绩', type: 'text', filter: (val) => val.isBusiness === 1? "是" : "否"  },
			{ title: '是否线上点单', type: 'text', filter: (val) => val.isOnline === 1? "是" : "否"  },
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
					data.classifyId = data.classifyId.toString() ;
					data.isCoupon = data.isCoupon.toString() ;
					data.isBusiness = data.isBusiness.toString() ;
					data.isOnline = data.isOnline.toString() ;

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
		classifyId: [ null , [ Validators.required ]],
		remark: [null] ,
		isCoupon: [ null , [ Validators.required ]],
		isBusiness: [ null , [ Validators.required ]],
		isOnline: [ null , [ Validators.required ]],
		id: [null]
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

	enum_classify: ENUM[] = [] ;
	enums(): void {
		this.classifySer.all()
			.subscribe( (res:RESPONSE) => {
				this.enum_classify = AdaptorUtils.reflect( res.data , {
					id: 'value' ,
					name: 'key'
				});
			})
	}
}
