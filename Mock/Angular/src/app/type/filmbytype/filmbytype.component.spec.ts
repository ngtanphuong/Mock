import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmbytypeComponent } from './filmbytype.component';

describe('FilmbytypeComponent', () => {
  let component: FilmbytypeComponent;
  let fixture: ComponentFixture<FilmbytypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmbytypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmbytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
