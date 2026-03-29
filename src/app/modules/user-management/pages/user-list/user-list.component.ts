import {Component} from '@angular/core';
import {TableModule} from 'primeng/table';
import {UserService} from 'app/modules/user-management/services/user.service';
import {User} from 'app/modules/user-management/model/user';
import {MAX_RETRY_ATTEMPTS, RETRY_DELAY_MS} from 'app/app.config';
import {BehaviorSubject, retry, Subject} from 'rxjs';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {TableRowDirective} from 'app/directives/table-row.directive';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {UpperCasePipe} from '@angular/common';
import {InputIcon} from 'primeng/inputicon';
import {IconField} from 'primeng/iconfield';
import {UserCriteria} from 'app/modules/user-management/services/criteria/user-criteria';
import {DialogService} from 'primeng/dynamicdialog';
import {UserFormComponent} from 'app/modules/user-management/pages/user-form/user-form.component';
import {
  UserFormFooterComponent
} from 'app/modules/user-management/pages/user-form/user-form-footer/user-form-footer.component';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-user-list',
  imports: [
    TableModule,
    TranslatePipe,
    TableRowDirective,
    InputText,
    Button,
    UpperCasePipe,
    InputIcon,
    IconField
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
class UserListComponent {

  protected loading = true;

  protected users: User[] = [];
  protected selectedUsers: User[] = [];

  protected criteria: UserCriteria = new UserCriteria(0, 20);

  constructor(
    private readonly dialogService: DialogService,
    private readonly translateService: TranslateService,
    private readonly messageService: MessageService,
    private readonly userService: UserService,
  ) {
    this.loadPage();
  }

  loadPage(event?: any) {
    if (event) {
      this.criteria.offset = event.first;
    }

    this.loading = true;
    // this.cd.detectChanges();

    this.userService.getUsers(this.criteria)
      .pipe(
        retry({count: MAX_RETRY_ATTEMPTS, delay: RETRY_DELAY_MS})
      )
      .subscribe({
        next: users => {
          if (!users || users.length === 0) {
            return;
          }

          this.users = users;
          this.loading = false;
        },
        error: err => {
        }
      })

  }

  isEditButtonEnabled() {
    return this.selectedUsers.length === 1;
  }

  isDeleteButtonEnabled() {
    return this.selectedUsers.length > 0;
  }

  protected onAddButtonClick() {
    this.openUserFormDialog();
  }

  protected onEditButtonClick() {
    this.openUserFormDialog(this.selectedUsers[0]);
  }

  private openUserFormDialog(user?: User) {
    let header: string;
    let detail: string;

    if (user) {
      const fullName = user.firstname + ' ' + user.lastname;
      header = this.translateService.instant('modules.user-management.pages.user-form.edit-title', {
        fullName: fullName,
      });
      detail = this.translateService.instant('modules.user-management.pages.user-list.edit-message', {
        fullName: fullName,
      });
    } else {
      header = this.translateService.instant('modules.user-management.pages.user-form.creation-title');
      detail = this.translateService.instant('modules.user-management.pages.user-list.creation-message');
    }

    this.dialogService.open(UserFormComponent, {
      header: header,
      width: '60vw',
      data: {
        buttonClick: new Subject<string>(),
        formValid: new BehaviorSubject(false),
        user: user,
      },
      templates: {
        footer: UserFormFooterComponent,
      }
    })?.onClose.subscribe((result: User) => {
      if (!result) {
        return;
      }

      this.messageService.add({severity: 'success', detail});

      // TODO reload users
    });
  }
}

export default UserListComponent
