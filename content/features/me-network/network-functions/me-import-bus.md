---
categories:
  - ME Network/Network Functions
item_ids:
  - appliedenergistics2:item_import_bus
related:
  - Possible Upgrades
title: ME Import Bus
---

![A picture of an Import Bus.](../../../../public/assets/large/import_bus.png)Pulls items from
the inventory it is pointed at and places them into the [ME Network](../../me-network.md)'s Networked Storage.
You can specify which items it will pull out via the UI, else it tries to pull out any item in the adjacent
inventory. The <ItemLink id="appliedenergistics2:item_import_bus"/> will
attempt to import any possible options, even if 1 or more of the configured
items cannot be stored. The <ItemLink
id="appliedenergistics2:item_import_bus"/> requires a
[channel](../channels.md) to function.

This is the functional opposite of the <ItemLink
id="appliedenergistics2:item_export_bus"/>.

<RecipeFor id="appliedenergistics2:item_import_bus" />
