import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastMemberListComponent } from './cast-member-list.component';

describe('CastMemberListComponent', () => {
  let component: CastMemberListComponent;
  let fixture: ComponentFixture<CastMemberListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CastMemberListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CastMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
