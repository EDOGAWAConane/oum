import { Component, OnInit, Input } from '@angular/core';
import { UploadFileService } from 'src/app/shared/services/upload-file.service';
import { FileUpload } from 'src/app/models/UploadFile.model'
import { map } from 'rxjs/operators';
import { MaxSizeService } from 'src/app/shared/services/max-size.service';

@Component({
  selector: 'app-details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.css']
})
export class DetailsUploadComponent implements OnInit {

  @Input() fileUpload: FileUpload;
  fileUploads: any[];

  constructor(private uploadService: UploadFileService, private maxService: MaxSizeService) { }

  ngOnInit() {
    console.log(this.maxService.getMaxsize());
    this.maxService.setUserMaxsize(this.maxService.getMaxsize());
    console.log(this.maxService.getMaxsize());
  }

  deleteFileUpload(fileUpload) {
    this.uploadService.deleteFileUpload(fileUpload);
      
    
    this.uploadService.getFilesList().snapshotChanges().pipe(
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

      if(this.fileUploads.length === 0){
        this.maxService.setUserMaxsize(1048576); 
      }
      else{
        this.maxService.setUserMaxsize(this.maxService.getMaxsize()+fileUpload.size); 
      }

    });

    console.log("You have " +this.maxService.getMaxsize()+ " more Bytes free" );
  }
}
