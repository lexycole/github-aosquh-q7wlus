import { Component, OnInit, ViewChild } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { BUTTON_STATE } from '../../types/btn-state';
import { TODO } from '../../types/todo';
import { TodoButtonComponent } from '../todo-button/todo-button.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {
  todos: TODO[];

  buttonState: BUTTON_STATE;

  @ViewChild(TodoButtonComponent, { static: true })
  private TodoButton: TodoButtonComponent;

  constructor(private todoService: TodosService) {}

  ngOnInit() {}

  onStateChange(state: BUTTON_STATE) {
    // Fulfil condition for button LOADING state
    if (state == BUTTON_STATE.LOADING) {
      this.setButtonState(BUTTON_STATE.LOADING);
      this.todos = [];

      this.todoService.getTodos().subscribe(
        (todos: TODO[]) => {
          this.setButtonState(BUTTON_STATE.LOADED_AND_DELAYING);
          this.todos = todos;
        },
        () => {
          this.setButtonState(BUTTON_STATE.ERROR);
        },
        () => {
          this.setButtonState(BUTTON_STATE.LOADED);
        }
      );
    }

    // Fulfil condition for button LOADED_AND_DELAYING state
    else if (state == BUTTON_STATE.LOADED_AND_DELAYING) {
      this.setButtonState(BUTTON_STATE.LOADED_AND_DELAYING);
    }

    // Fulfil cndition for button LOADED state
    else if (state == BUTTON_STATE.LOADED) {
      this.setButtonState(BUTTON_STATE.LOADED);
    } else {
      this.setButtonState(BUTTON_STATE.ERROR);
    }
  }

  private setButtonState(state: BUTTON_STATE) {
    this.TodoButton.state = this.buttonState;
    this.buttonState = state;
  }
}
