import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordSettingsPageComponent } from './password-settings-page.component';

describe('PasswordSettingsPageComponent', () => {
  let component: PasswordSettingsPageComponent;
  let fixture: ComponentFixture<PasswordSettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasswordSettingsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
