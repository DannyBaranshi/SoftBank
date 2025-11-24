import {
  Component,
  TestBed,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_core,
  init_testing,
  init_tslib_es6
} from "./chunk-IFGCUM6I.js";

// angular:jit:template:src/app/features/pages/inicio/inicio.html
var inicio_default;
var init_inicio = __esm({
  "angular:jit:template:src/app/features/pages/inicio/inicio.html"() {
    inicio_default = "<p>inicio works!</p>\n";
  }
});

// angular:jit:style:src/app/features/pages/inicio/inicio.scss
var inicio_default2;
var init_inicio2 = __esm({
  "angular:jit:style:src/app/features/pages/inicio/inicio.scss"() {
    inicio_default2 = "/* src/app/features/pages/inicio/inicio.scss */\n/*# sourceMappingURL=inicio.css.map */\n";
  }
});

// src/app/features/pages/inicio/inicio.ts
var InicioComponent;
var init_inicio3 = __esm({
  "src/app/features/pages/inicio/inicio.ts"() {
    "use strict";
    init_tslib_es6();
    init_inicio();
    init_inicio2();
    init_core();
    InicioComponent = class InicioComponent2 {
    };
    InicioComponent = __decorate([
      Component({
        selector: "app-inicio",
        standalone: true,
        imports: [],
        template: inicio_default,
        styles: [inicio_default2]
      })
    ], InicioComponent);
  }
});

// src/app/features/pages/inicio/inicio.spec.ts
var require_inicio_spec = __commonJS({
  "src/app/features/pages/inicio/inicio.spec.ts"(exports) {
    init_testing();
    init_inicio3();
    describe("Inicio", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [InicioComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(InicioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_inicio_spec();
//# sourceMappingURL=spec-app-features-pages-inicio-inicio.spec.js.map
