import { Routes } from '@angular/router';

import { InicioComponent } from './features/pages/inicio/inicio';
import { ProductosComponent } from './features/pages/productos/productos';
import { InformacionComponent } from './features/pages/informacion/informacion';
import { SearchResultsComponent } from './features/pages/search-results/search-results';
import { AccountsComponent } from './features/accounts/accounts.component';
<<<<<<< HEAD
=======
import { CreateAccountComponent } from './features/accounts/account_create/create-account.component';
import { TransferComponent } from './features/pages/transferencias/transfer.component'
import { BalanceComponent } from './features/pages/saldo/balance.component'
import { OrderProductsComponent } from './features/pages/solicitar-productos/orderProducts.component'
import { CertificatesComponent } from './features/pages/certificados/certificates.component'

import { AuthGuard } from './features/services/auth/auth.guard';
>>>>>>> 7f39322b (Segunda entrega version dos)

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
  path: 'inicio',
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
<<<<<<< HEAD
  { path: 'cuentas',
    component: AccountsComponent,
    title: 'Banco Web | Cuentas'
=======

  // Requieren autenticación:
  { path: 'cuentas', 
    component: AccountsComponent, 
    title: 'Banco Web | Cuentas', 
    canActivate: [AuthGuard] 
  },
  { path: 'cuentas/crear', 
    component: CreateAccountComponent, 
    title: 'Banco Web | Crear Cuenta', 
    canActivate: [AuthGuard] 
  },
  { path: 'transferencias', 
    component: TransferComponent,
    canActivate: [AuthGuard] 
  },
  { path: 'saldo',
    component: BalanceComponent,
    canActivate: [AuthGuard]
  },
  { path: 'solicitar-productos',
    component: OrderProductsComponent, 
    canActivate: [AuthGuard]
  },
  { path: 'certificados',
    component: CertificatesComponent,
    canActivate: [AuthGuard]
>>>>>>> 7f39322b (Segunda entrega version dos)
  },
];
