import {
  Component,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6
} from "./chunk-IFGCUM6I.js";

// angular:jit:template:src/app/features/header/search/search.html
var search_default;
var init_search = __esm({
  "angular:jit:template:src/app/features/header/search/search.html"() {
    search_default = '<div class="box">\n  <input type="text" placeholder="Search...">\n  <a href="#">\n    <i class="fas fa-search"></i>\n  </a>\n</div>\n';
  }
});

// angular:jit:style:src/app/features/header/search/search.scss
var search_default2;
var init_search2 = __esm({
  "angular:jit:style:src/app/features/header/search/search.scss"() {
    search_default2 = "/* src/app/features/header/search/search.scss */\n* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n:host {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.box {\n  height: 30px;\n  display: flex;\n  cursor: pointer;\n  padding: 10px 20px;\n  background: #fff;\n  align-items: center;\n  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);\n  border-radius: 50px;\n  transition: all 0.3s ease;\n}\n.box input {\n  width: 0;\n  border: none;\n  outline: none;\n  transition: width 0.5s ease;\n  background: transparent;\n}\n.box:hover input {\n  width: 300px;\n  padding-left: 10px;\n}\n.box i {\n  color: #111;\n  font-size: 18px;\n}\n/*# sourceMappingURL=search.css.map */\n";
  }
});

// src/app/features/header/search/search.ts
var Search;
var init_search3 = __esm({
  "src/app/features/header/search/search.ts"() {
    "use strict";
    init_tslib_es6();
    init_search();
    init_search2();
    init_core();
    Search = class Search2 {
    };
    Search = __decorate([
      Component({
        selector: "app-search",
        imports: [],
        template: search_default,
        styles: [search_default2]
      })
    ], Search);
  }
});

export {
  Search,
  init_search3 as init_search
};
//# sourceMappingURL=chunk-X4ADEF4R.js.map
