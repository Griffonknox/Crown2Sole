import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { environment } from './environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
    clientTitle = environment.clientTitle;
      ngOnInit() {
    document.documentElement.style.setProperty('--nav-bar-bg', environment.theme.navBarBg);
    document.documentElement.style.setProperty('--nav-bar-hover', environment.theme.navBarHover);
  }
}
