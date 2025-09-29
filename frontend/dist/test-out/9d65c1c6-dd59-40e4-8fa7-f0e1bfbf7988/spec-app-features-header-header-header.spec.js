import {
  Header,
  init_header
} from "./chunk-FFVEVSIW.js";
import "./chunk-NXFJB7ZL.js";
import "./chunk-5GRK3SUC.js";
import "./chunk-H24JOTWO.js";
import "./chunk-COUECIDK.js";
import "./chunk-X4ADEF4R.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-IFGCUM6I.js";

// src/app/features/header/header/header.spec.ts
var require_header_spec = __commonJS({
  "src/app/features/header/header/header.spec.ts"(exports) {
    init_testing();
    init_header();
    describe("Header", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [Header]
        }).compileComponents();
        fixture = TestBed.createComponent(Header);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_header_spec();
//# sourceMappingURL=spec-app-features-header-header-header.spec.js.map
