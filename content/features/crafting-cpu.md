---
title: Crafting CPU
---

# Crafting CPU



Manages a single auto crafting task from start to finsh, built of various
crafting units.

<CategoryIndex category="ME Network/Crafting CPU" />

To be a valid crafting CPU, two rules must be met:



  1. The CPU must be a cuboid, completely composed of the parts listed above; air or other blocks are not valid.
  2. The CPU must contain at least 1 storage component.



The crafting CPU as a multi-block only requires a single channel for the
entire structure. Crafting co-processors increase the number of tasks the
crafting CPU can perform at once; with no co-processors, the crafting CPU can
perform a single task at a time. Storage requirements are moderately
complicated, and do not follow the usual ME storage math, but for a first
approximation, you will need a little over one byte per input item, output
item, or operation.



You can name your Crafting CPUs by naming any of the crafting
units it is made up of with an <ItemLink
id="appliedenergistics2:inscriber"/> or an Anvil.



To provide patterns to the autocrafting cpus you can use <ItemLink
id="appliedenergistics2:item_interface"/> or <ItemLink
id="appliedenergistics2:item_level_emitter"/>.



### Intro to Autocrafting
