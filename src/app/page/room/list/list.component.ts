import { Component, OnInit } from '@angular/core' ;
import { MsgService, RoomAreaService, RoomTypeService } from '../../../service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomListService } from '../../../service/room/list.service';
import { TableData } from '@shared/component/table/table.model';
import { AdaptorUtils, DateUtils } from '@shared/utils';
import { Service } from '../../../../decorators/service.decorator';
import { ENUM, RESPONSE } from '../../../models';
import { zip } from 'rxjs';

@Component({
	selector: 'room-list' ,
	templateUrl: './list.component.html' ,
	styleUrls: ['./list.component.less']
})
export class RoomListComponent implements OnInit{
	constructor(
		private readonly msg: MsgService ,
		private readonly fb: FormBuilder ,
		private readonly typeSer: RoomTypeService ,
		private readonly areaSer: RoomAreaService ,
		private readonly service: RoomListService
	){}

	public ngOnInit(): void {
		this.getList() ;
		this.getENUMS();
	}

	public form: FormGroup = this.fb.group({
		id: [ null ] ,
		name: [ null , [Validators.required ]] ,
		remark: [ null ] ,
		areaId: [ null , [Validators.required ]] ,
		typeId: [ null , [Validators.required ]] ,
		status: [ null ] ,
	});


	public modalShow: boolean = false ;
	public editMark: boolean = false ;
	public deleteModalShow: boolean = false ;

	public ENUM_Area: ENUM[] = [] ;
	public ENUM_Type: ENUM[] = [] ;

	public add(): void{
		this.form.reset() ;
		this.modalShow = true ;
		this.editMark = false ;
	}

	public tableData: TableData = {
		loading: true,
		page: 1,
		total: 0,
		columns: [
			{ title: '名称', type: 'text', reflect: 'name' },
			{ title: '所属区域', type: 'text',filter: val => val.areaInfo.name },
			{ title: '所属类型', type: 'text',filter: val => val.typeInfo.name },
			{ title: '所属店', type: 'text',filter: val => val.shopInfo.name },
			{ title: '创建时间', type: 'text',filter: val => DateUtils.format(val.createTime, 'y-m-d') },
			{ title: '备注', type: 'text', filter: (val) => val.remark ? val.remark : '无'}
		],
		data: [],
		btn: {
			title: '操作',
			items: [{
				type: 'del',
				title: '删除',
				fn: (data) => {
					this.deleteModalShow = true;
					this.form.patchValue(data);
				},
			}, {
				type: 'edit',
				title: '编辑',
				fn: (data) => {
					data.typeId = data.typeId.toString() ;
					data.areaId = data.areaId.toString() ;
					this.form.patchValue(data);
					this.editMark = true;
					this.modalShow = true;
				},
			}],
		},
	}

	@Service("service.post" , true , function(){
		return (this as RoomListComponent).form.value ;
	})
	public makeNew( $event : MouseEvent ): void{
		this.msg.success("添加成功") ;
		this.modalShow = false ;
		this.getList();
	};

	@Service("service.put" , true , function(){
		return (this as RoomListComponent).form.value ;
	})
	public save( $event : MouseEvent ): void{
		this.msg.success("修改成功");
		this.modalShow = false ;
		this.getList() ;
	};

	@Service('service.delete', true, function(){
		return (this as RoomListComponent).form.value ;
	})
	public modalConfirm($event: Event) {
		this.msg.success('删除成功');
		this.deleteModalShow = false;
		this.getList() ;
	};

	public getList():void {
		this.tableData.loading = true ;
		this.service.get()
			.subscribe( ( res: RESPONSE ) => {
				this.tableData.loading = false ;
				this.tableData.data = res.data ;
			});
	}

	private getENUMS(): void{
		zip( this.typeSer.get(), this.areaSer.get() )
			.subscribe( ( res: RESPONSE[] ) => {
				this.ENUM_Type = AdaptorUtils.reflect(res[0].data , {name: 'key' , id: 'value'}) ;
				this.ENUM_Area = AdaptorUtils.reflect(res[1].data , {name: 'key' , id: 'value'}) ;
			});
	}
}

