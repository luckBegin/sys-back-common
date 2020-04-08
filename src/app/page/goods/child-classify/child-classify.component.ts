import { Component , OnInit } from '@angular/core';
import {MsgService} from "../../../service";
import {AdaptorUtils, DateUtils, ObjectUtils} from '@shared/utils';
import { QueryModel } from './query.model'
import {ENUM, RESPONSE} from '../../../models';
import {GoodsSubClassifyService , GoodsChildClassifyService} from '../../../service/goods';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Service} from '../../../../decorators/service.decorator';
@Component({
	selector: 'goods-classify' ,
	templateUrl: './child-classify.component.html',
	styleUrls: ['./child-classify.component.less']
})
export class GoodsChildClassifyComponent implements OnInit{
	constructor(
		private readonly msg: MsgService,
		private readonly classifySer: GoodsSubClassifyService,
		private readonly service: GoodsChildClassifyService,
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
		page: this.queryModel.currentPage,
		total: 0,
		columns: [
			{ title: '名称', type: 'text', reflect: 'name' },
			{ title: '排序', type: 'text', reflect: 'sort' },
			{ title: '单位', type: 'text', reflect: 'unit' },
			{ title: '价格', type: 'text', reflect: 'price' },
			{ title: '成本', type: 'text', reflect: 'cost' },
			{ title: '提成比列', type: 'text', filter: val => val.bonusPercent + '%'},
			{ title: '提成金额', type: 'text', reflect: 'bonusNum' },
			{ title: '是否线上', type: 'text', filter: (val) => val.isOnline === 1? "是" : "否"},
			{ title: '兑换所需积分', type: 'text', filter: (val) => val.exchange === 1? "是" : "否" },
			{ title: '赠送等级', type: 'text', reflect: 'level' },
			{ title: '是否套餐', type: 'text' , filter: (val) => val.isPackage === 1? "是" : "否"},
			{ title: '是否配送', type: 'text', filter: (val) => val.isDelivery === 1? "是" : "否"  },
			{ title: '封面', type: 'img', reflect: 'img' },
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
					data.subClassifyId = AdaptorUtils.numToStr( data.subClassifyId ) ;
					data.isOnline =  AdaptorUtils.numToStr(data.isOnline ) ;
					data.isPackage = AdaptorUtils.numToStr(data.isPackage ) ;
					data.isDelivery = AdaptorUtils.numToStr(data.isDelivery ) ;

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

	searchBarData = {
		conditions: [
			{name: '商品名称', type: 'input', model: 'name', placeHolder: '请输入用户名'},
		],
		notify: {
			query: (data: QueryModel) => {
				this.queryModel = ObjectUtils.extend(this.queryModel, data) as QueryModel;
				this.getList();
			},
			reset: (data: QueryModel) => {
				this.queryModel = new QueryModel;
				this.tableData.page = 1 ;
				this.getList();
			},
		}
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
		subClassifyId: [ null , [Validators.required ]] ,
		unit: [null , [Validators.required]],
		price: [null , [Validators.required]],
		bonusPercent: [null , [Validators.required]],
		bonusNum: [null , [Validators.required]] ,
		isOnline: [null , [Validators.required]] ,
		level: [ null , [Validators.required]] ,
		isPackage: [ null , [Validators.required]] ,
		isDelivery: [ null , [Validators.required]] ,
		remark: [null] ,
		id: [null],
		sort: [null],
		cost: [ null ] ,
		exchange: [null] ,
		img: [ null ]

	});

	@Service('service.delete', true, function(){
		return (this as GoodsChildClassifyComponent).form.value ;
	})
	modalConfirm($event: Event) {
		this.msg.success('删除成功');
		this.isVisible = false;
		this.getList() ;
	};

	@Service("service.post" , true , function(){
		return (this as GoodsChildClassifyComponent).form.value ;
	})
	makeNew( $event : MouseEvent ): void{
		this.msg.success("添加成功") ;
		this.infoBoxShow = false ;
		this.getList();
	};

	@Service("service.put" , true , function(){
		return (this as GoodsChildClassifyComponent).form.value ;
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
