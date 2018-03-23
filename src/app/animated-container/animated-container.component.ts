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
      state('inactive',   style({
        backgroundColor: '#eee',
        transform: 'scale(0)'
      })),
      state('loser', style({
        backgroundColor: '#eee',
        transform: 'scale(0.7)'
      })),
      state('winner',   style({
        backgroundColor: '#4caf50',
        transform: 'scale(0.9)'
      })),
      transition('inactive => winner', animate('300ms ease-in')),
      transition('inactive => loser', animate('300ms ease-in')),
      transition('loser => winner', animate('300ms ease-in')),
      transition('winner => loser', animate('300ms ease-out'))
    ])
  ]
})
export class AnimatedContainerComponent implements OnInit {

  @Input() animState: string;

  constructor() { }

  ngOnInit() {
  }
}
