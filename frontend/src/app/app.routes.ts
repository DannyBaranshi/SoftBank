import { Routes } from '@angular/router';

import { InicioComponent } from './features/pages/inicio/inicio';
import { ProductosComponent } from './features/pages/productos/productos';
import { InformacionComponent } from './features/pages/informacion/informacion';
import { SearchResultsComponent } from './features/pages/search-results/search-results';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
    component: InicioComponent,
    title: 'Banco Web | Inicio'
  },
  {
    path: 'productos',
    component: ProductosComponent,
    title: 'Banco Web | Productos'
  },
  {
    path: 'informacion',
    component: InformacionComponent,
    title: 'Banco Web | Información'
  },
  { path: 'search',
    component: SearchResultsComponent,
    title: 'Banco Web | Busqueda'
  },
];