import {
  HamburguerMenu,
  init_hamburguer_menu
} from "./chunk-NXFJB7ZL.js";
import {
  Logo,
  Router,
  init_logo,
  init_router
} from "./chunk-5GRK3SUC.js";
import {
  Search,
  init_search
} from "./chunk-X4ADEF4R.js";
import {
  Component,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6
} from "./chunk-IFGCUM6I.js";

// angular:jit:template:src/app/features/header/header/header.html
var header_default;
var init_header = __esm({
  "angular:jit:template:src/app/features/header/header/header.html"() {
    header_default = `<header class="header">
  <app-logo class="logo"></app-logo>

  <nav class="nav">
    <button (click)="navigateTo('/inicio')" routerLinkActive="active">Inicio</button>
    <button (click)="navigateTo('/productos')" routerLinkActive="active">Productos</button>
    <button (click)="navigateTo('/informacion')" routerLinkActive="active">Informaci\xF3n</button>
    <app-search class="search-component"></app-search>
  </nav>

  <app-hamburguer-menu></app-hamburguer-menu>
</header>
`;
  }
});

// angular:jit:style:src/app/features/header/header/header.scss
var header_default2;
var init_header2 = __esm({
  "angular:jit:style:src/app/features/header/header/header.scss"() {
    header_default2 = '/* src/app/features/header/header/header.scss */\n.header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  background-color: #111;\n  padding: 10px 20px;\n  border-radius: 12px;\n  border: 2px solid #fff;\n  font-family:\n    "Courier New",\n    Courier,\n    monospace;\n  color: white;\n}\n.logo {\n  display: flex;\n  align-items: center;\n}\n.nav {\n  display: flex;\n  align-items: center;\n  background-color: transparent;\n  border: 2px solid #fff;\n  padding: 5px 10px;\n  border-radius: 10px;\n  margin: 0 20px;\n}\n.nav button {\n  background: transparent;\n  color: white;\n  border: none;\n  font-size: 16px;\n  margin: 0 10px;\n  cursor: pointer;\n  font-family: inherit;\n}\n.nav button.active,\n.nav button:hover {\n  color: #ff5e5e;\n  text-decoration: none;\n}\n.search-component {\n  margin-left: 20px;\n  display: flex;\n  align-items: center;\n}\n.hamburger-placeholder {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n}\n.hamburger-icon {\n  color: white;\n  font-size: 24px;\n  cursor: default;\n}\n/*# sourceMappingURL=header.css.map */\n';
  }
});

// src/app/features/header/header/header.ts
var Header;
var init_header3 = __esm({
  "src/app/features/header/header/header.ts"() {
    "use strict";
    init_tslib_es6();
    init_header();
    init_header2();
    init_core();
    init_router();
    init_search();
    init_logo();
    init_hamburguer_menu();
    Header = class Header2 {
      router;
      constructor(router) {
        this.router = router;
      }
      navigateTo(path) {
        this.router.navigate([path]);
      }
      static ctorParameters = () => [
        { type: Router }
      ];
    };
    Header = __decorate([
      Component({
        selector: "app-header",
        standalone: true,
        imports: [Search, Logo, HamburguerMenu],
        template: header_default,
        styles: [header_default2]
      })
    ], Header);
  }
});

export {
  Header,
  init_header3 as init_header
};
//# sourceMappingURL=chunk-FFVEVSIW.js.map
