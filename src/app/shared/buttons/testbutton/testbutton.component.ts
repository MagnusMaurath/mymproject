import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-testbutton',
  templateUrl: './testbutton.component.html',
  styleUrls: ['./testbutton.component.css']
})
export class TestbuttonComponent {
  @Output() buttonClickk = new EventEmitter();

  onClick() {
    this.buttonClickk.emit();
    console.log("in testbuttoncomponent geklickt");
  }
}
