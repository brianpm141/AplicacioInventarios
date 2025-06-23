import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutobackupComponent } from './autobackup.component';

describe('AutobackupComponent', () => {
  let component: AutobackupComponent;
  let fixture: ComponentFixture<AutobackupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutobackupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutobackupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
