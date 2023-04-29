import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  userIsAuthenticated = false;
  public iconstring = "arrow_forward_ios";
  private authListenerSubs: Subscription;
  constructor(private authService: AuthService) {}

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }


  ngOnInit(): void {
    this.userIsAuthenticated= this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });


    const showNavbar = (toggleId, navId, bodyId, headerId) =>{
      const toggle = document.getElementById(toggleId),
      nav = document.getElementById(navId),
      bodypd = document.getElementById(bodyId),
      headerpd = document.getElementById(headerId)


      // Validate that all variables exist
      if(toggle && nav && bodypd && headerpd){
      toggle.addEventListener('click', ()=>{
      // show navbar
      nav.classList.toggle('show')
      // change icon
      toggle.classList.toggle('bx-x')
      // add padding to body
      bodypd.classList.toggle('body-right')
      // add padding to header
      headerpd.classList.toggle('body-pd')
      this.iconstring = toggle.classList.contains('bx-x') ? 'arrow_back_ios' : 'arrow_forward_ios';
      })

      }


      }


      showNavbar('header-toggle','nav-bar','bodyId','header')

      /*===== LINK ACTIVE =====*/
      const linkColor = document.querySelectorAll('.nav_link')

      function colorLink(){
      if(linkColor){
      linkColor.forEach(l=> l.classList.remove('active'))
      this.classList.add('active')
      }
      }
      linkColor.forEach(l=> l.addEventListener('click', colorLink))
  }


  onLogout() {
    this.authService.logout();
  }



















}
