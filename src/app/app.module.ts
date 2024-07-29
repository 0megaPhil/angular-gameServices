import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';

import {AppRoutingModule} from './app-routing.module';
import {UserModule} from './user/user.module';
import {InventoryModule} from './inventory/inventory.module';
import {CharacterModule} from './character/character.module';
import {WorldModule} from './world/world.module';
import {CharacterComponent} from "./character/character.component";
import {InventoryComponent} from "./inventory/inventory.component";
import {UserComponent} from "./user/user.component";
import {WorldComponent} from "./world/world.component";
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {GraphQLModule} from './graphql.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    UserModule,
    InventoryModule,
    CharacterModule,
    WorldModule,
    ReactiveFormsModule,
    GraphQLModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  declarations: [
    AppComponent,
    CharacterComponent,
    InventoryComponent,
    UserComponent,
    WorldComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
