import {
  Logo,
  init_logo
} from "./chunk-5GRK3SUC.js";
import "./chunk-H24JOTWO.js";
import "./chunk-COUECIDK.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-IFGCUM6I.js";

// src/app/features/header/logo/logo.spec.ts
var require_logo_spec = __commonJS({
  "src/app/features/header/logo/logo.spec.ts"(exports) {
    init_testing();
    init_logo();
    describe("Logo", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Logo]
        }).compileComponents();
        fixture = TestBed.createComponent(Logo);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_logo_spec();
//# sourceMappingURL=spec-app-features-header-logo-logo.spec.js.map
