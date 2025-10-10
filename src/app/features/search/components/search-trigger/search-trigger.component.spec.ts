import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTriggerComponent } from './search-trigger.component';

describe('SearchTriggerComponent', () => {
  let component: SearchTriggerComponent;
  let fixture: ComponentFixture<SearchTriggerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTriggerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTriggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
