import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TogglebuttonComponent } from '../../buttons/togglebutton/togglebutton.component';

@Component({
  selector: 'app-normal-card',
  templateUrl: './normal-card.component.html',
  styleUrls: ['./normal-card.component.css']
})
export class NormalCardComponent {
  @Input() cardTitle: string;
 // @Output() notifyGrandParent= new EventEmitter();
 @Input() buttonLabel: string = "Click me";
 @Output() buttonClickNormalCard = new EventEmitter();


 onButtonClick() {
   this.buttonClickNormalCard.emit();
 }

 @Input() toggleChecked: boolean = false;

  // Das Ereignis "toggleChange" wird über Output an die übergeordnete Komponente weitergeleitet, wenn sich der Wert der Toggle-Komponente ändert.
  @Output() toggleChange = new EventEmitter<boolean>();

  // Diese Methode wird aufgerufen, wenn sich der Wert der Toggle-Komponente ändert.
  onToggle(value: boolean) {
    // Der Wert der Toggle-Komponente wird als Argument an die "console.log"-Methode übergeben, um eine Nachricht in der Konsole auszugeben.
    this.toggleChange.emit(value);
    console.log('Toggle changed in Normal Card Component: ' + value);
  }
}
