import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiMessagesListComponent } from './ui-messages-list.component';

describe('UiMessagesListComponent', () => {
  let component: UiMessagesListComponent;
  let fixture: ComponentFixture<UiMessagesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiMessagesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiMessagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
