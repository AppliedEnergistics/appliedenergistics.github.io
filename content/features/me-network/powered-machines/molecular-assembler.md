---
categories:
- ME Network/Powered Machines
item_ids:
  - appliedenergistics2:molecular_assembler
related:
- Possible Upgrades
title: Molecular Assembler
---

The assembler is a powered machine which crafts items, it can be upgraded by
inserting <ItemLink id="appliedenergistics2:speed_card"/> into it;
once upgraded it is very fast.



Functions in one of two modes, single pattern mode or interface fed mode.



### Single Pattern Mode



Uses a single <ItemLink id="appliedenergistics2:encoded_pattern"/>
(must be a crafting recipe) inserted into the assembler to craft an item
without a crafting network.



This makes it useful in stand alone setups or in configurations where it can
be fed by other mods and even chained together to to craft a final output.
Items will be accepted from any side and exported into any available
inventories.



### Interface Fed Mode



Uses the <ItemLink id="appliedenergistics2:encoded_pattern"/> (must
be a crafting recipe) from attached <ItemLink
id="appliedenergistics2:item_interface"/> to craft items when they are
requested by the [Crafting CPU](../../crafting-cpu.md).



Note, this mode requires that the assembler _**not** _contain a <ItemLink
id="appliedenergistics2:encoded_pattern"/>; the pattern slot must be
empty.

<RecipeFor id="appliedenergistics2:molecular_assembler"/>
