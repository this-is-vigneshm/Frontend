import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Repo } from 'src/app/models/Repo';
import { RestapiService } from 'src/app/restapi.service';
import { TokenService } from 'src/app/token.service';

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn<Repo> | null;
  sortDirections: NzTableSortOrder[];
}

@Component({
  selector: 'app-knowledge-repo',
  templateUrl: './knowledge-repo.component.html',
  styleUrls: ['./knowledge-repo.component.css'],
})
export class KnowledgeRepoComponent implements OnInit {
  userData: any;

  constructor(
    private restApiService: RestapiService,
    private notification: NzMessageService,
    private router: Router,
    private tokenService: TokenService,
    private restServices: RestapiService
  ) {}
  ngOnInit(): void {
    if (this.tokenService.getToken() === null) {
      this.router.navigateByUrl('/signin');
      window.location.pathname = '/signin';
    } else {
      this.getAllRepo();
    }
  }

  repoColumns: ColumnItem[] = [
    {
      name: 'Employee Name',
      sortOrder: null,
      sortFn: (a: Repo, b: Repo) => a.id - b.id,
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Document Name',
      sortOrder: 'descend',
      sortFn: (a: Repo, b: Repo) => a.name.localeCompare(b.name),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Asset Name',
      sortOrder: 'descend',
      sortFn: (a: Repo, b: Repo) => a.asset_name.localeCompare(b.asset_name),
      sortDirections: ['ascend', 'descend', null],
    },
    {
      name: 'Uploaded by',
      sortOrder: 'descend',
      sortDirections: ['ascend', 'descend', null],
      sortFn: (a: Repo, b: Repo) => a.user.id - b.user.id,
    },
    {
      name: 'Uploaded Time',
      sortOrder: 'descend',
      sortFn: (a: Repo, b: Repo) => a.uploaded_time - b.uploaded_time,
      sortDirections: ['ascend', 'descend', null],
    },
  ];

  repoList: Repo[] = [];
  searchString: any;
  searchResults: Repo[] = [];

  getAllRepo() {
    this.restApiService.getAllRepo().subscribe(
      (data) => {
        console.log('Success', data);
        this.repoList = data.responseData;
        this.searchResults = this.repoList;
        this.notification.success('Repo Details is Found!');
      },
      (error) => {
        console.log('Error occurred', error);
        this.notification.error('Error getting the repo Details!');
      }
    );
  }

  filterData(event: any) {
    function ispositive(element: Repo, index: any, array: any) {
      return (
        element.name
          .toLocaleLowerCase()
          .includes(event.target.value.toLocaleLowerCase()) ||
        element.asset_name
          .toLocaleLowerCase()
          .includes(event.target.value.toLocaleLowerCase())
      );
    }
    this.searchResults = this.repoList.filter(ispositive);
  }

  isVisible: boolean = false;
  isConfirmLoading = false;

  showCreate() {
    this.isVisible = true;
  }
  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {
    this.isVisible = false;
  }

  handleDelete(id: any) {
    this.deleteRepo(id);
  }

  deleteRepo(id: any) {
    this.restServices.deleteRepo(id).subscribe(
      (data) => {
        this.notification.success('Repo Deleted Successfully.!');
      },
      (error) => {
        console.log('Error Occured', error);
        this.notification.error('Error Deleting Repo!');
      }
    );
  }
}
