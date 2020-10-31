import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStatelistComponent } from './create-statelist.component';

describe('CreateStatelistComponent', () => {
  let component: CreateStatelistComponent;
  let fixture: ComponentFixture<CreateStatelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStatelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStatelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
