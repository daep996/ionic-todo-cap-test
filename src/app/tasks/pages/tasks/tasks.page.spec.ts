import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksPage } from './tasks.page';

describe('HomePage', () => {
  let component: TasksPage;
  let fixture: ComponentFixture<TasksPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(TasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
