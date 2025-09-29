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

// angular:jit:template:src/app/features/pages/productos/productos.html
var productos_default;
var init_productos = __esm({
  "angular:jit:template:src/app/features/pages/productos/productos.html"() {
    productos_default = "<p>productos works!</p>\n";
  }
});

// angular:jit:style:src/app/features/pages/productos/productos.scss
var productos_default2;
var init_productos2 = __esm({
  "angular:jit:style:src/app/features/pages/productos/productos.scss"() {
    productos_default2 = "/* src/app/features/pages/productos/productos.scss */\n/*# sourceMappingURL=productos.css.map */\n";
  }
});

// src/app/features/pages/productos/productos.ts
var ProductosComponent;
var init_productos3 = __esm({
  "src/app/features/pages/productos/productos.ts"() {
    "use strict";
    init_tslib_es6();
    init_productos();
    init_productos2();
    init_core();
    ProductosComponent = class ProductosComponent2 {
    };
    ProductosComponent = __decorate([
      Component({
        selector: "app-productos",
        standalone: true,
        imports: [],
        template: productos_default,
        styles: [productos_default2]
      })
    ], ProductosComponent);
  }
});

// src/app/features/pages/productos/productos.spec.ts
var require_productos_spec = __commonJS({
  "src/app/features/pages/productos/productos.spec.ts"(exports) {
    init_testing();
    init_productos3();
    describe("Productos", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [ProductosComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(ProductosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_productos_spec();
//# sourceMappingURL=spec-app-features-pages-productos-productos.spec.js.map
