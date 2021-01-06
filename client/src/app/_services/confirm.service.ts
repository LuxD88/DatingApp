import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  confirm(title = 'Confirmation',
      message = 'Are you sure we want to do this?',
      btnOkText = 'Ok',
      btnCancelText = 'Cancel') {
        const config = {
          initialState: {
            title,
            message,
            btnOkText,
            btnCancelText
          }
        }
      this.bsModalRef = this.modalService.show('confirm', config);
      }
}
