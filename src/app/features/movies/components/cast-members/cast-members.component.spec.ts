import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CastMembersComponent } from './cast-members.component';

describe('CastMembersComponent', () => {
  let component: CastMembersComponent;
  let fixture: ComponentFixture<CastMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CastMembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CastMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
