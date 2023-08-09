import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Input } from '@angular/core';

@Component({
  selector: 'app-actors-page',
  templateUrl: './actors-page.component.html',
  styleUrls: ['./actors-page.component.css']
})
export class ActorsPageComponent {
  @Input()
    requiredFileType:string;

    fileName = '';
    uploadProgress:number;
    uploadSub: Subscription;
    file:File;

    constructor(private http: HttpClient) {}

    onFileSelected(event) {
        this.file = event.target.files[0];
        this.fileName = this.file.name;
        if(this.fileName != 'ratings.csv'){
          document.getElementById("fileName").style.color = "red"
        } else {
          document.getElementById("fileName").style.color = "#00C030"
        }
    }

    onFileUpload(){
      if (this.file.name == 'ratings.csv') {
        const formData = new FormData();
        formData.append("file", this.file);
        console.log(this.file)
        this.http.post("http://localhost:8080/api/thumbnail-upload", formData).subscribe((response)=>{
          console.log("File Uploaded")
        });

    } else {
      console.log('Incorrect File')
    }
    }
}
