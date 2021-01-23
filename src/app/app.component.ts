import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { Ialert } from './Interface/Alert';
import { NewsService } from './services/news.service';
import { AlertState } from './states/Alert.state';
import { UIState } from './states/Ui.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @Select(UIState.GetUiLoading) IsLoading$: Observable<boolean>;
  @Select(AlertState.GetAlert) alert$: Observable<Ialert>;
  title = 'NewsApp';
  constructor(private newsService: NewsService, private router: Router, private modalService: NgbModal) {
    this.alert$.subscribe(r => {
      if (r) {
        this.modalService.dismissAll();
        const message = r.Message;
        const dialogRef = this.modalService.open(ConfirmDialogComponent, {
          centered: true,
          backdrop: 'static',
          keyboard: false
        });
        dialogRef.componentInstance.title = r.Title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.showCancel = false;
        dialogRef.result.then(dialogResult => {
          if (r.Route) {
            this.router.navigate([r.Route]);
          }
        });
      }
    })
  }
}
