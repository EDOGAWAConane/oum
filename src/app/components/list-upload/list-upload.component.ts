import { Component, OnInit, NgZone } from '@angular/core';
import { map } from 'rxjs/operators';

import { UploadFileService } from 'src/app/shared/services/upload-file.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit {

  fileUploads: any[];

  constructor(private uploadService: UploadFileService,
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone) { }

  public providerId: string = 'null';

  ngOnInit(): void {
    // Use snapshotChanges().pipe(map()) to store the key
    this.uploadService.getFileUploads(6).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = [];
      const user = JSON.parse(localStorage.getItem('user'));
      for (let file of fileUploads) {
        if (file.email === user.email) {
          this.fileUploads.push(file);
        }
      }
    });
  }
}
