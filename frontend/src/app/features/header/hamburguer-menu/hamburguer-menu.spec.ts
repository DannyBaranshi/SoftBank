import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburguerMenu } from './hamburguer-menu';

describe('HamburguerMenu', () => {
  let component: HamburguerMenu;
  let fixture: ComponentFixture<HamburguerMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HamburguerMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HamburguerMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
