import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Input } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-films-page',
  templateUrl: './films-page.component.html',
  styleUrls: ['./films-page.component.css']
})
export class FilmsPageComponent {
  @Input()
    fileName = '';
    file:File;

    public barChartLegend = true;
    public barChartPlugins = [];
    public barChartData: ChartConfiguration<'bar'>['data'] = {
      labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
      datasets: [
        { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'No. Films Watched' }
      ]
    };
    public barChartOptions: ChartConfiguration<'bar'>['options'] = {
      responsive: false,
    };
    public showChart = false; 

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
        formData.append("watchlistFile", this.file);
        console.log(this.file)
        this.http.post("http://localhost:8080/films-watched/upload", formData).subscribe((res)=>{
          console.log("File Uploaded")
        });
      } else {
        console.log('Incorrect File')
      }
      
    }

    getFilmsWatchedData(){
      this.http.get('http://localhost:8080/films-watched/filmsWatched').subscribe(res => {
        const filmsWatched = res;
        console.log(filmsWatched)
        this.filmByYearBarChart(filmsWatched)
      });
    }

    filmByYearBarChart(filmsWatched){
      const films = filmsWatched; //film data from server
      const yearsObjectList = [] //stores the occurences of dates
      
      films.forEach(item => { //finds occurences of dates
        const year = item.year
        const existingYear = yearsObjectList.find(entry => entry.year === year)
        if (existingYear) { //if date exists increase its count
          existingYear.count++;
        } else { //if not it onlty exists once
          yearsObjectList.push({ year: year, count: 1 }); //creates an object with a year and a count
        }
      });
      const yearsArray = [] //used to store only the years
      yearsObjectList.forEach(item => { //for each year add to the new array to be used as labels for the graph
        yearsArray.push(item.year)
      });
      const countArray = [] //used to store only the count
      yearsObjectList.forEach(item => {
        countArray.push(item.count)
      });
      console.log(yearsArray)
      console.log(yearsObjectList)
      this.barChartData.labels = yearsArray; //sets the graph labels to the years
      this.barChartData.datasets[0].data = countArray;
      this.showChart = true;
      
  };
  
}

