import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwapPage } from './SwapPage';
import { RouterTestingModule } from '@angular/router/testing';

describe('SwapPage', () => {
  let component: SwapPage;
  let fixture: ComponentFixture<SwapPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwapPage ],
      imports: [ RouterTestingModule ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to other page on button click', () => {
    const navigateSpy = spyOn(component['router'], 'navigateByUrl');
    component.navigateToOtherPage();
    expect(navigateSpy).toHaveBeenCalledWith('/other-page');
  });

  // Add more tests as needed...
});
