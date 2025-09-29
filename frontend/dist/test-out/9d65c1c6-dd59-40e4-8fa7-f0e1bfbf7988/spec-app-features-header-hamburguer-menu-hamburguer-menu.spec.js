import {
  HamburguerMenu,
  init_hamburguer_menu
} from "./chunk-NXFJB7ZL.js";
import "./chunk-COUECIDK.js";
import {
  TestBed,
  __async,
  __commonJS,
  init_testing
} from "./chunk-IFGCUM6I.js";

// src/app/features/header/hamburguer-menu/hamburguer-menu.spec.ts
var require_hamburguer_menu_spec = __commonJS({
  "src/app/features/header/hamburguer-menu/hamburguer-menu.spec.ts"(exports) {
    init_testing();
    init_hamburguer_menu();
    describe("HamburguerMenu", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [HamburguerMenu]
        }).compileComponents();
        fixture = TestBed.createComponent(HamburguerMenu);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_hamburguer_menu_spec();
//# sourceMappingURL=spec-app-features-header-hamburguer-menu-hamburguer-menu.spec.js.map
