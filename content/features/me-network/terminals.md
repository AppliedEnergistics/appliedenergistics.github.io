---
item_ids:
  - appliedenergistics2:crafting_terminal
  - appliedenergistics2:terminal
  - appliedenergistics2:interface_terminal
  - appliedenergistics2:pattern_terminal
title: Terminals
---

## Item Terminal

![A picture of 3 terminals.](../../../public/assets/large/terminal.png)

The <ItemLink id="appliedenergistics2:terminal"/> is a HID which gives you access
to items stored in your [ME Network](../me-network.md). This will also include
items accessible through <ItemLink id="item_storage_bus" />.

It has the ability to sort and search, as well as filter by using <ItemLink
id="appliedenergistics2:view_cell"/>. It requires a [channel](channels.md) to function.

Can be upgraded into a <ItemLink id="appliedenergistics2:crafting_terminal"/>.

<RecipeFor id="appliedenergistics2:terminal" />

## Item Crafting Terminal

![A picture of 3 crafting terminals.](../../../public/assets/large/crafting_terminal.png)

The <ItemLink id="appliedenergistics2:crafting_terminal"/> is the upgraded version of the <ItemLink
id="appliedenergistics2:terminal"/> which has an integrated crafting grid with access to
a [ME Network](../me-network.md)'s Networked Storage.

Like the <ItemLink id="appliedenergistics2:terminal"/> it also requires a [channel](channels.md) to function.

<RecipeFor id="appliedenergistics2:crafting_terminal" />

## Pattern Provider Terminal

Gives remote access to all interface pattern slots on your network separated
by which type of machine they are on. It will show the type of machine in the
terminal, however you can name the <ItemLink id="appliedenergistics2:item_interface"/> in the <ItemLink
id="appliedenergistics2:inscriber"/> or an Anvil to alter the name
displayed in the <ItemLink id="appliedenergistics2:interface_terminal"/>.

Combined with the fact that you can toggle if the interface shows up at all
this gets you control over your itnerface terminal's display.

<RecipeFor id="appliedenergistics2:interface_terminal" />

## Pattern Terminal

A specialized version of the <ItemLink id="appliedenergistics2:crafting_terminal"/> designed to
encode <ItemLink id="appliedenergistics2:blank_pattern"/> into <ItemLink id="appliedenergistics2:crafting_pattern"/>
or <ItemLink id="appliedenergistics2:processing_pattern"/>.

See [auto crafting](../auto-crafting.md) for more details on automated crafting in general.

Lets you browse the contents of your network like other terminals, but also
contains an area for designing patterns. There are two modes for pattern
encoding. Crafting Patterns, and Processing Patterns. Processing patterns are
designed for use with machines that do not use standard crafting recipes; such
as furnaces, or other machines. To select between modes, click the button to
the right of the interface; when it shows a standard crafting table, it will
create Crafting Patterns, and when it shows a furnace, it will create
Processing Patterns.

For Crafting Patterns ("Crafts..."), you specify the input crafting materials
on a standard 3x3 crafting grid, and the output materials are determined
automatically.

For Processing Patterns ("Creates..."), you specify the input materials and
output materials, including quantity, by placing stacks of items in the
interface. If a processing operation is not guaranteed to succeed (such as
secondary products from some machines), it will not work correctly as a
Processing Pattern.

When designing crafting patterns you can click the output to extract a crafted
item as long as you have the materials required to craft the item.

<RecipeFor id="appliedenergistics2:pattern_terminal" />
