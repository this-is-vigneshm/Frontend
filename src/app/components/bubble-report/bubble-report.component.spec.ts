import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleReportComponent } from './bubble-report.component';

describe('BubbleReportComponent', () => {
  let component: BubbleReportComponent;
  let fixture: ComponentFixture<BubbleReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BubbleReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BubbleReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
