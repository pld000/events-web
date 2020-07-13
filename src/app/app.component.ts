import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WarningModalComponent } from "./components/warning-modal/warning-modal.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _modalService: NgbModal) {
  }

  public showWarning(errors: any) {
    const modalRef = this._modalService.open(WarningModalComponent);
    modalRef.componentInstance.errors = errors;
  }
}
