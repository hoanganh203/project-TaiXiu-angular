import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaiXiuGameComponent } from './tai-xiu-game.component';

describe('TaiXiuGameComponent', () => {
  let component: TaiXiuGameComponent;
  let fixture: ComponentFixture<TaiXiuGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaiXiuGameComponent]
    });
    fixture = TestBed.createComponent(TaiXiuGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
