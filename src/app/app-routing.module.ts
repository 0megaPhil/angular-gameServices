import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CharacterComponent} from "./character/character.component";
import {InventoryComponent} from "./inventory/inventory.component";
import {UserComponent} from "./user/user.component";
import {WorldComponent} from "./world/world.component";

const routes: Routes = [
  {path: 'character', component: CharacterComponent},
  {path: 'inventory', component: InventoryComponent},
  {path: 'user', component: UserComponent},
  {path: 'world', component: WorldComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
