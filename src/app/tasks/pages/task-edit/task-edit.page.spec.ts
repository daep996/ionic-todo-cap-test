import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskstaskEditPage } from './task-edit.page';

describe('TaskstaskEditPage', () => {
  let component: TaskstaskEditPage;
  let fixture: ComponentFixture<TaskstaskEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskstaskEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
