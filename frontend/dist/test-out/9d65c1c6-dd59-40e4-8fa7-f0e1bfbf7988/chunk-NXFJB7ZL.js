import {
  CommonModule,
  init_common
} from "./chunk-COUECIDK.js";
import {
  Component,
  __decorate,
  __esm,
  init_core,
  init_tslib_es6,
  signal
} from "./chunk-IFGCUM6I.js";

// angular:jit:template:src/app/features/header/hamburguer-menu/hamburguer-menu.html
var hamburguer_menu_default;
var init_hamburguer_menu = __esm({
  "angular:jit:template:src/app/features/header/hamburguer-menu/hamburguer-menu.html"() {
    hamburguer_menu_default = '<button class="hamburger-button" (click)="toggleMenu()">\u2630</button>\n\n<div class="menu-panel" [class.open]="menuOpen()">\n    <div class="menu-header">\n        <div class="avatar-placeholder">Avatar perfil</div>\n    </div>\n  <div class="menu-content">\n\n    <div *ngIf="!isLoggedIn()">\n      <button class="menu-btn" (click)="iniciarSesion()">Iniciar Sesi\xF3n</button>\n      <button class="menu-btn">Registrarse</button>\n    </div>\n\n    <div *ngIf="isLoggedIn()">\n        <button class="menu-btn">Cuentas</button>\n        <button class="menu-btn">Transferencias</button>\n        <button class="menu-btn">Saldo</button>\n        <button class="menu-btn">Solicitar Productos</button>\n        <button class="menu-btn">Certificados</button>\n        <button class="menu-btn logout" (click)="cerrarSesion()">Cerrar Sesi\xF3n</button>\n    </div>\n\n  </div>\n</div>\n';
  }
});

// angular:jit:style:src/app/features/header/hamburguer-menu/hamburguer-menu.scss
var hamburguer_menu_default2;
var init_hamburguer_menu2 = __esm({
  "angular:jit:style:src/app/features/header/hamburguer-menu/hamburguer-menu.scss"() {
    hamburguer_menu_default2 = "/* src/app/features/header/hamburguer-menu/hamburguer-menu.scss */\n.hamburger-button {\n  background: none;\n  border: none;\n  font-size: 28px;\n  color: white;\n  cursor: pointer;\n  padding: 0 10px;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.menu-panel {\n  position: fixed;\n  top: 0;\n  right: -280px;\n  width: 280px;\n  height: 100vh;\n  background-color: #111;\n  border-left: 2px solid white;\n  padding: 20px;\n  box-sizing: border-box;\n  transition: right 0.3s ease;\n  color: white;\n  z-index: 1000;\n}\n.menu-panel.open {\n  right: 0;\n}\n.menu-header {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.menu-content {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n.avatar-placeholder {\n  width: 120px;\n  height: 120px;\n  border-radius: 50%;\n  border: 2px solid white;\n  margin-bottom: 30px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-family: monospace;\n  font-size: 14px;\n  text-align: center;\n  -webkit-user-select: none;\n  user-select: none;\n  color: #aaa;\n}\n.menu-btn {\n  width: 100%;\n  padding: 10px 0;\n  border: none;\n  background: none;\n  border-bottom: 1px solid white;\n  color: white;\n  font-size: 16px;\n  font-family: monospace;\n  cursor: pointer;\n  text-align: center;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.menu-btn.logout {\n  border-bottom: none;\n  font-weight: bold;\n  cursor: pointer;\n  margin-top: auto;\n  padding-top: 15px;\n}\n/*# sourceMappingURL=hamburguer-menu.css.map */\n";
  }
});

// src/app/features/header/hamburguer-menu/hamburguer-menu.ts
var HamburguerMenu;
var init_hamburguer_menu3 = __esm({
  "src/app/features/header/hamburguer-menu/hamburguer-menu.ts"() {
    "use strict";
    init_tslib_es6();
    init_hamburguer_menu();
    init_hamburguer_menu2();
    init_core();
    init_common();
    HamburguerMenu = class HamburguerMenu2 {
      isLoggedIn = signal(false);
      menuOpen = signal(false);
      toggleMenu() {
        this.menuOpen.update((open) => !open);
      }
      iniciarSesion() {
        this.isLoggedIn.set(true);
        this.menuOpen.set(false);
      }
      cerrarSesion() {
        this.isLoggedIn.set(false);
        this.menuOpen.set(false);
      }
    };
    HamburguerMenu = __decorate([
      Component({
        selector: "app-hamburguer-menu",
        standalone: true,
        imports: [CommonModule],
        template: hamburguer_menu_default,
        styles: [hamburguer_menu_default2]
      })
    ], HamburguerMenu);
  }
});

export {
  HamburguerMenu,
  init_hamburguer_menu3 as init_hamburguer_menu
};
//# sourceMappingURL=chunk-NXFJB7ZL.js.map
