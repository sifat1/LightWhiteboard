import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfboards } from './list-ofboards';

describe('ListOfboards', () => {
  let component: ListOfboards;
  let fixture: ComponentFixture<ListOfboards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfboards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfboards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
