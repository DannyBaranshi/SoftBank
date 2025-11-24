import {
  Header,
  init_header
} from "./chunk-FFVEVSIW.js";
import "./chunk-NXFJB7ZL.js";
import {
  RouterOutlet,
  init_router
} from "./chunk-5GRK3SUC.js";
import "./chunk-H24JOTWO.js";
import "./chunk-COUECIDK.js";
import "./chunk-X4ADEF4R.js";
import {
  Component,
  TestBed,
  __async,
  __commonJS,
  __decorate,
  __esm,
  init_core,
  init_testing,
  init_tslib_es6,
  provideZonelessChangeDetection,
  signal
} from "./chunk-IFGCUM6I.js";

// angular:jit:template:src/app/app.html
var app_default;
var init_app = __esm({
  "angular:jit:template:src/app/app.html"() {
    app_default = "<app-header></app-header>\r\n<router-outlet></router-outlet>";
  }
});

// angular:jit:style:src/app/app.scss
var app_default2;
var init_app2 = __esm({
  "angular:jit:style:src/app/app.scss"() {
    app_default2 = '/* src/app/app.scss */\n:host {\n  display: block;\n  min-height: 100vh;\n  font-family:\n    "Courier New",\n    Courier,\n    monospace;\n}\n/*# sourceMappingURL=app.css.map */\n';
  }
});

// src/app/app.ts
var AppComponent;
var init_app3 = __esm({
  "src/app/app.ts"() {
    "use strict";
    init_tslib_es6();
    init_app();
    init_app2();
    init_core();
    init_router();
    init_header();
    AppComponent = class AppComponent2 {
      title = signal("frontend");
    };
    AppComponent = __decorate([
      Component({
        selector: "app-root",
        standalone: true,
        imports: [RouterOutlet, Header],
        template: app_default,
        styles: [app_default2]
      })
    ], AppComponent);
  }
});

// src/app/app.spec.ts
var require_app_spec = __commonJS({
  "src/app/app.spec.ts"(exports) {
    init_core();
    init_testing();
    init_app3();
    describe("App", () => {
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [AppComponent],
          providers: [provideZonelessChangeDetection()]
        }).compileComponents();
      }));
      it("should create the app", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
      });
      it("should render title", () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector("h1")?.textContent).toContain("Hello, frontend");
      });
    });
  }
});
export default require_app_spec();
//# sourceMappingURL=spec-app-app.spec.js.map
