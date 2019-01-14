import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmBytypeComponent } from './film-bytype.component';

describe('FilmBytypeComponent', () => {
  let component: FilmBytypeComponent;
  let fixture: ComponentFixture<FilmBytypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmBytypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmBytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
