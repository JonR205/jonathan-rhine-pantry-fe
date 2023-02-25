import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientformComponent } from './ingredientform.component';

describe('IngredientformComponent', () => {
  let component: IngredientformComponent;
  let fixture: ComponentFixture<IngredientformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngredientformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
