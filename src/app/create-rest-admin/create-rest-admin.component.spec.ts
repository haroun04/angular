import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRestAdminComponent } from './create-rest-admin.component';

describe('CreateRestAdminComponent', () => {
  let component: CreateRestAdminComponent;
  let fixture: ComponentFixture<CreateRestAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRestAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRestAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
