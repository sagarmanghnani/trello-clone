import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStateListComponent } from './create-state-list.component';

describe('CreateStateListComponent', () => {
  let component: CreateStateListComponent;
  let fixture: ComponentFixture<CreateStateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
