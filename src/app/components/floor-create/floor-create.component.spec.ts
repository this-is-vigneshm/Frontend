import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorCreateComponent } from './floor-create.component';

describe('FloorCreateComponent', () => {
  let component: FloorCreateComponent;
  let fixture: ComponentFixture<FloorCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloorCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
