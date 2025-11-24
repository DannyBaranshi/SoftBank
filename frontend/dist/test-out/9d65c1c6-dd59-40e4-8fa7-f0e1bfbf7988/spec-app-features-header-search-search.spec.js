import {
  Search,
  init_search
} from "./chunk-X4ADEF4R.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-IFGCUM6I.js";

// src/app/features/header/search/search.spec.ts
var require_search_spec = __commonJS({
  "src/app/features/header/search/search.spec.ts"(exports) {
    init_testing();
    init_search();
    describe("Search", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          declarations: [Search]
        }).compileComponents();
        fixture = TestBed.createComponent(Search);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_search_spec();
//# sourceMappingURL=spec-app-features-header-search-search.spec.js.map
