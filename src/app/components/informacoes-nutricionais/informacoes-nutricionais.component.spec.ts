import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacoesNutricionaisComponent } from './informacoes-nutricionais.component';

describe('InformacoesNutricionaisComponent', () => {
  let component: InformacoesNutricionaisComponent;
  let fixture: ComponentFixture<InformacoesNutricionaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformacoesNutricionaisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacoesNutricionaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
