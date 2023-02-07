import {Component} from '@angular/core';

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.css']
})
export class SnippetsComponent {
  snippets = [
    {
      title: 'Snippet 1',
      description: 'Description 1',
    },
    {
      title: 'Snippet 2',
      description: 'Description 2',
    },
    {
      title: 'Snippet 3',
      description: 'Description 3',
    }
  ];

}
