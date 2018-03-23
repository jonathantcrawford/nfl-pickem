import { Component, OnInit, Input } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-animated-container',
  templateUrl: './animated-container.component.html',
  styleUrls: ['./animated-container.component.css'],
  animations: [
    trigger('transitionState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out'))
    ])
  ]
})
export class AnimatedContainerComponent implements OnInit {

  @Input() animState: string;

  constructor() { }

  ngOnInit() {
  }



}
