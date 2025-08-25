import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskMetadata } from './task-metadata';

describe('TaskMetadata', () => {
  let component: TaskMetadata;
  let fixture: ComponentFixture<TaskMetadata>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskMetadata]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskMetadata);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
