import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchGeneComponent } from './search-gene.component';

describe('SearchGeneComponent', () => {
  let component: SearchGeneComponent;
  let fixture: ComponentFixture<SearchGeneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchGeneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchGeneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
