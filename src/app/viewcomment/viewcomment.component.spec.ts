import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcommentComponent } from './viewcomment.component';

describe('ViewcommentComponent', () => {
  let component: ViewcommentComponent;
  let fixture: ComponentFixture<ViewcommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
