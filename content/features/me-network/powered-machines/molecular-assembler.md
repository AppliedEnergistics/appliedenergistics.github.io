---
categories:
  - ME Network/Powered Machines
item_ids:
  - appliedenergistics2:molecular_assembler
title: Molecular Assembler
---

The assembler is a powered machine which crafts items, it can be upgraded by
inserting <ItemLink id="appliedenergistics2:speed_card"/> into it;
once upgraded it is very fast.

Functions in one of two modes, single pattern mode or automatic crafting mode.

### Single Pattern Mode

Uses a single <ItemLink id="appliedenergistics2:crafting_pattern"/> inserted into the assembler to craft an item
without a crafting network.

This makes it useful in stand alone setups or in configurations where it can
be fed by other mods and even chained together to to craft a final output.
Items will be accepted from any side and exported into any available
inventories.

### Automatic Crafting Mode

Uses the <ItemLink id="appliedenergistics2:crafting_pattern"/>
from attached <ItemLink id="appliedenergistics2:pattern_provider"/> to craft items when they are
requested by the [Crafting CPU](../../auto-crafting.md).

**NOTE:** This mode requires that the assembler's pattern slot is empty.

<RecipeFor id="appliedenergistics2:molecular_assembler" />
