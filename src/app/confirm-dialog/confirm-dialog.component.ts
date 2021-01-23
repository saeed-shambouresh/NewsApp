import { Component, OnInit, Inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})


export class ConfirmDialogComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() showCancel = 0;
  constructor(public activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.activeModal.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.activeModal.close(false);
  }
}

/**
 * Class to represent confirm dialog model.
 *
 * It has been kept here to keep it as part of shared component.
 */
