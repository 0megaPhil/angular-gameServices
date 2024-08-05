export class Inventory {
  constructor(public characterId: string,
              public items: InventoryItem[], public currencies: InventoryCurrency[], public uuid?: string) {
  }
}

export class InventoryItem {
  constructor(public name: string, public itemId: string,
              public inventoryId: string, public quantity: number, public uuid?: string) {
  }
}

export class InventoryCurrency {
  constructor(public name: string, public currencyId: string,
              public inventoryId: string, public quantity: number, public uuid?: string) {
  }

}
