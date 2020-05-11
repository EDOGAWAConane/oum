import { Component, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/shared/services/upload-file.service';
import { FileUpload } from 'src/app/models/UploadFile.model';
import { map } from 'rxjs/operators';
import { MaxSizeService } from 'src/app/shared/services/max-size.service';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  fileUploads: any[];
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
 
  constructor(private uploadService: UploadFileService, private maxService: MaxSizeService) {
   }
 
  ngOnInit() {
    console.log('§§§§§§§§§§§' + this.maxService.getMaxsize());
    let maxSize = this.maxService.getMaxsize();
    document.getElementById('size').innerHTML = 'You have '+ maxSize + ' Bytes left';
  }
 
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }
 
  upload() {

    let varSize = 0;
    let remainSize =0;
    let maxSize = this.maxService.getMaxsize(); 
    

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
          varSize = varSize+file.size;
        }
      }

      this.maxService.setUserMaxsize(maxSize-varSize);

      console.log('varsize => '+varSize);
      const file = this.selectedFiles.item(0);
      if( varSize>= maxSize){  
          document.getElementById('size').innerHTML = 'Oops! No more space'; 
        }

       else{ 
        const file = this.selectedFiles.item(0);
        this.selectedFiles = undefined;
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);

        console.log('=======> '+maxSize );
        console.log("oooooof "+ varSize);

        maxSize = maxSize - varSize -file.size; 
        if(maxSize<0){
          maxSize = maxSize + 2*file.size;
        }
          document.getElementById('size').innerHTML = 'You have '+ maxSize + ' Bytes left';
          this.maxService.setUserMaxsize(maxSize);
      }

      

    });

   


    

  }
  
}
