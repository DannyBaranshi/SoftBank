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

// angular:jit:template:src/app/features/pages/search-results/search-results.html
var search_results_default;
var init_search_results = __esm({
  "angular:jit:template:src/app/features/pages/search-results/search-results.html"() {
    search_results_default = "<p>search-results works!</p>\n";
  }
});

// angular:jit:style:src/app/features/pages/search-results/search-results.scss
var search_results_default2;
var init_search_results2 = __esm({
  "angular:jit:style:src/app/features/pages/search-results/search-results.scss"() {
    search_results_default2 = "/* src/app/features/pages/search-results/search-results.scss */\n/*# sourceMappingURL=search-results.css.map */\n";
  }
});

// src/app/features/pages/search-results/search-results.ts
var SearchResultsComponent;
var init_search_results3 = __esm({
  "src/app/features/pages/search-results/search-results.ts"() {
    "use strict";
    init_tslib_es6();
    init_search_results();
    init_search_results2();
    init_core();
    SearchResultsComponent = class SearchResultsComponent2 {
    };
    SearchResultsComponent = __decorate([
      Component({
        selector: "app-search-results",
        standalone: true,
        imports: [],
        template: search_results_default,
        styles: [search_results_default2]
      })
    ], SearchResultsComponent);
  }
});

// src/app/features/pages/search-results/search-results.spec.ts
var require_search_results_spec = __commonJS({
  "src/app/features/pages/search-results/search-results.spec.ts"(exports) {
    init_testing();
    init_search_results3();
    describe("SearchResults", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [SearchResultsComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(SearchResultsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_search_results_spec();
//# sourceMappingURL=spec-app-features-pages-search-results-search-results.spec.js.map
