import { Component, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) { }
/*
  ngOnInit(): void {
    const showNavbar = (toggleId, navId, bodyId, headerId) => {
      const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        bodypd = document.getElementById(bodyId),
        headerpd = document.getElementById(headerId)

        console.log("showNavbar function called!"); // Ausgabe des Konsolenausgabe-Statements
      // Validate that all variables exist
      if (toggle && nav && bodypd && headerpd) {
        toggle.addEventListener('click', () => {
          // show navbar
          nav.classList.toggle('show')
          // change icon
          toggle.classList.toggle('bx-x')
          // add padding to body
          bodypd.classList.toggle('body-pd')
          // add class to toggle
          toggle.classList.add('bodyright')
          // add padding to header
          headerpd.classList.toggle('body-pd')
          // add class to body
          const body = document.getElementById('bodyId');
          body.classList.toggle('my-class');
        })
      }
    }

    showNavbar('header-toggle', 'nav-bar', 'bodyId', 'header')


    const linkColor = document.querySelectorAll('.nav_link')

    function colorLink() {
      if (linkColor) {
        linkColor.forEach(l => l.classList.remove('active'))
        this.classList.add('active')
      }
    }
    linkColor.forEach(l => l.addEventListener('click', colorLink))
  }
  */
}
