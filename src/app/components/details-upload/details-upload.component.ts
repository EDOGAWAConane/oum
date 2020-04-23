import { Component, OnInit, Input } from '@angular/core';
import { UploadFileService } from 'src/app/shared/services/upload-file.service';
import { FileUpload } from 'src/app/models/UploadFile.model'

@Component({
  selector: 'app-details-upload',
  templateUrl: './details-upload.component.html',
  styleUrls: ['./details-upload.component.css']
})
export class DetailsUploadComponent implements OnInit {

  @Input() fileUpload: FileUpload;
 
  constructor(private uploadService: UploadFileService) { }
 
  ngOnInit() {
  }
 
  deleteFileUpload(fileUpload) {
    this.uploadService.deleteFileUpload(fileUpload);
  }
}
