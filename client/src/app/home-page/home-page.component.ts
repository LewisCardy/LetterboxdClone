import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  fileName = '';
  files = [];
  constructor(private http: HttpClient) {}

    onFileSelected(event) {
      for (let i = 0; i < this.files.length; i++) {
        const mainDiv = document.getElementById("main-content");
        const file:File = this.files[i];
        const div = document.createElement('div');
        div.textContent = file.name;
        mainDiv.appendChild(div);
      }

        const file:File = event.target.files[0];

        const formData = new FormData();

        formData.append("thumbnail", file);

        const upload$ = this.http.post("/api/thumbnail-upload", formData);

        upload$.subscribe();
    }
}
