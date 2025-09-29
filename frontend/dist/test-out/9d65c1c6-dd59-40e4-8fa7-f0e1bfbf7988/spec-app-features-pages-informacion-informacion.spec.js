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

// angular:jit:template:src/app/features/pages/informacion/informacion.html
var informacion_default;
var init_informacion = __esm({
  "angular:jit:template:src/app/features/pages/informacion/informacion.html"() {
    informacion_default = "<p>informacion works!</p>\n";
  }
});

// angular:jit:style:src/app/features/pages/informacion/informacion.scss
var informacion_default2;
var init_informacion2 = __esm({
  "angular:jit:style:src/app/features/pages/informacion/informacion.scss"() {
    informacion_default2 = "/* src/app/features/pages/informacion/informacion.scss */\n/*# sourceMappingURL=informacion.css.map */\n";
  }
});

// src/app/features/pages/informacion/informacion.ts
var InformacionComponent;
var init_informacion3 = __esm({
  "src/app/features/pages/informacion/informacion.ts"() {
    "use strict";
    init_tslib_es6();
    init_informacion();
    init_informacion2();
    init_core();
    InformacionComponent = class InformacionComponent2 {
    };
    InformacionComponent = __decorate([
      Component({
        selector: "app-informacion",
        standalone: true,
        imports: [],
        template: informacion_default,
        styles: [informacion_default2]
      })
    ], InformacionComponent);
  }
});

// src/app/features/pages/informacion/informacion.spec.ts
var require_informacion_spec = __commonJS({
  "src/app/features/pages/informacion/informacion.spec.ts"(exports) {
    init_testing();
    init_informacion3();
    describe("Informacion", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [InformacionComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(InformacionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_informacion_spec();
//# sourceMappingURL=spec-app-features-pages-informacion-informacion.spec.js.map
