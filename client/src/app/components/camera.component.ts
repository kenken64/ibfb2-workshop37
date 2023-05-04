import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CameraService } from '../services/camera.service';
import { WebcamComponent, WebcamImage } from 'ngx-webcam';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit, OnDestroy, AfterViewInit{
  @ViewChild(WebcamComponent) webcam!: WebcamComponent;
  width=400;
  height=400;
  pics: string[] = [];
  sub$!: Subscription;
  trigger = new Subject<void>;

  constructor(private router: Router, private camSvc: CameraService){}

  ngOnInit(): void {
      
  }

  ngOnDestroy(): void {
      this.sub$.unsubscribe();
  }

  ngAfterViewInit(): void {
      this.webcam.trigger= this.trigger;
      this.sub$ = this.webcam.imageCapture.subscribe( 
        this.snapshot.bind(this)
      )
  }

  snap(){
    this.trigger.next();
  }

  snapshot(webcamImg: WebcamImage){
    // share this blob with the upload form
    this.camSvc.imageData = webcamImg.imageAsDataUrl;
    this.pics.push(this.camSvc.imageData); 
  }
}
