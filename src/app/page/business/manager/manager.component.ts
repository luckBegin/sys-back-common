import {Component, OnInit} from '@angular/core' ;
import {CmdService, ManagerService, MsgService, StaffService} from "../../../service";
import {QueryModel} from "./query.model";
import {ENUM, RESPONSE} from "../../../models";
import {AdaptorUtils, DateUtils, ObjectUtils} from "@shared/utils";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Service} from "../../../../decorators/service.decorator";

@Component({
	selector: 'business-manager',
	templateUrl: './manager.component.html',
	styleUrls: ['./manager.component.less']
})
export class BusinessManagerComponent implements OnInit {
	constructor(
		private readonly msg: MsgService,
		private readonly service: ManagerService,
		private readonly fb: FormBuilder,
		private readonly staffService: StaffService
	) {
	}

	ngOnInit(): void {
		this.getList();
		this.getStaff();
	}

	private queryModel: QueryModel = new QueryModel()

	private getList(): void {
		this.tableData.loading = true;
		this.service.get(this.queryModel)
			.subscribe((res: RESPONSE) => {
				this.tableData.data = res.data;
				this.tableData.loading = false;
				if (res.page)
					this.tableData.total = res.page.totalNumber;
			}, err => {
				this.tableData.loading = false;
				console.log(err);
				this.msg.error(err);
			});
	}

	public tableData = {
		loading: true,
		page: 1,
		total: 0,
		columns: [
			{title: '姓名', type: 'text', reflect: 'name'},
			{title: '月限额度', type: 'text', reflect: 'monthLimit'},
			{title: '日限额度', type: 'text', reflect: 'dailyLimit'},
			{title: '已用额度', type: 'text', reflect: 'hasUse'},
			{
				title: '剩余额度', type: 'text', filter: (val) => {
					return val.hasUse ? val.monthLimit : val.monthLimit - val.hasUse;
				}
			},
			{title: '赠送等级', type: 'text', reflect: 'level'},
		],
		data: [],
		btn: {
			title: '操作',
			items: [{
				type: 'del',
				title: '删除',
				fn: (data) => {
					this.form.patchValue(data);
					this.isVisible = true;
				},
			}, {
				type: 'edit',
				title: '编辑',
				fn: (data) => {
					this.form.patchValue(data);
					this.editMark = true;
					this.infoBoxShow = true;
				},
			}],
		},
		change: (type: string, size: number) => {
			if (type === 'size')
				this.queryModel.pageSize = size;
			if (type === 'page') {
				this.tableData.page = size;
				this.queryModel.currentPage = size;
			}
			this.getList()
		},
	};

	public searchBarData = {
		conditions: [
			{name: '姓名', data: [], default: "", type: 'input', model: 'name', placeHolder: '请请输入姓名'},
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

	public editMark: boolean = false;
	public infoBoxShow: boolean = false;
	public isVisible: boolean = false;
	public ENUM_level: ENUM[] = ManagerService.ENUM_Level;
	private form: FormGroup = this.fb.group({
		id: [null],
		name: [null, [Validators.required]],
		dailyLimit: [null, [Validators.required]],
		monthLimit: [null, [Validators.required]],
		level: [null, [Validators.required]],
		staffId: [null, [Validators.required]]
	});

	public add(): void {
		this.form.reset();
		this.editMark = false;
		this.infoBoxShow = !this.infoBoxShow;
		this.staffModel = null;
	};

	@Service('service.delete', true, function () {
		return this.form.value;
	})
	modalConfirm($event: Event) {
		this.msg.success('删除成功');
		this.isVisible = false;
		this.getList();
	};

	public ENUM_Staffs: ENUM[] = [];

	private getStaff(): void {
		this.staffService.all()
			.subscribe((res: RESPONSE) => {
				this.ENUM_Staffs = AdaptorUtils.reflect(res.data, {'username': 'key', 'id': 'value'});
			})
	}

	public staffModel: ENUM;

	public staffChange($event: ENUM): void {
		this.form.patchValue({
			staffId: $event.value,
			name: $event.key
		});
		this.staffModel = $event;
	}

	@Service("service.post", true, function () {
		return (this as BusinessManagerComponent).form.value;
	})
	makeNew($event: MouseEvent): void {
		this.msg.success("操作成功");
		this.infoBoxShow = false;
		this.getList();
	};

	@Service("service.put", true, function () {
		return (this as BusinessManagerComponent).form.value;
	})
	save($event: MouseEvent): void {
		this.msg.success("修改成功");
		this.infoBoxShow = false;
		this.getList();
	};
}
