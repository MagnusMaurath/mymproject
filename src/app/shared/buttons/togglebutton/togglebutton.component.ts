import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-togglebutton',
  templateUrl: './togglebutton.component.html',
  styleUrls: ['./togglebutton.component.css']
})


export class TogglebuttonComponent {
 // Der Input "checked" definiert den Anfangswert des Slidetoggle. "true" bedeutet, dass der Slidetoggle aktiviert ist.
 @Input() checked: boolean = false;

 // Das Event "change" wird ausgelöst, wenn der Wert des Slidetoggle geändert wird.
 @Output() change = new EventEmitter<boolean>();

 // Diese Methode wird aufgerufen, wenn der Wert des Slidetoggle geändert wird.
 onChange(event) {
   // Der neue Wert des Slidetoggle wird aus dem "event" extrahiert und an das "change"-Event weitergegeben.
   this.change.emit(event.checked);
 }
 // onToggleChanged(event: any) {
 //   this.changed.emit(event.target.checked);
 // }
}


