---
title: Storage Cells
sidenav_icon: appliedenergistics2:64k_item_storage_cell
---

Storage Cells, are one of the core mechanics of storage in Applied Energistics
2, there are three kinds: one for items, one for fluids, and one for regions of
space.

## Item Storage

Item storage cells can hold up to 63 distinct types of items; the
number of items they can store depends in part on how many types they're
holding, and their storage capacity.

<ItemGrid>
  <ItemIcon itemId="1k_item_storage_cell" />
  <ItemIcon itemId="4k_item_storage_cell" />
  <ItemIcon itemId="16k_item_storage_cell" />
  <ItemIcon itemId="64k_item_storage_cell" />
</ItemGrid>

### Portable Item Storage

<ItemGrid>
  <ItemIcon itemId="1k_portable_item_cell" />
  <ItemIcon itemId="4k_portable_item_cell" />
  <ItemIcon itemId="16k_portable_item_cell" />
  <ItemIcon itemId="64k_portable_item_cell" />
</ItemGrid>

### Capacity Limits

Storage cells have limits of size, and limits
of types, plus you need to consider the resource usage of your cells, to
decide what your best options are. Each storage cell can store a fixed amount
of data. Each type consumes a number of bytes (which varies with the cell
size), and each item consumes one bit of storage, so eight items consume one
byte, and a full stack of 64 consumes 8 bytes, regardless of how the item
would stack outside an ME network. For instance, 64 identical saddles don't
take up more space than 64 stone.

Gunning straight for top tier storage cells, is not generally the best idea,
since you use more resources, but don't get any extra type storage.

Below is a table comparing the different tiers of storage cells, how much they store, and
a rough estimate of their cost.

#### Storage Cell Contents Vs Cost

| Cell                                                        | Bytes  | Types | Byte/Type | C-Quartz | N-Quartz | Gold | Diamonds |
| ----------------------------------------------------------- | ------ | ----- | --------- | -------- | -------- | ---- | -------- |
| <ItemLink id="appliedenergistics2:1k_item_storage_cell" />  | 1,024  | 63    | 8         | 5        | 5        | 1    | 0        |
| <ItemLink id="appliedenergistics2:4k_item_storage_cell" />  | 4,096  | 63    | 32        | 17       | 5        | 3    | 0        |
| <ItemLink id="appliedenergistics2:16k_item_storage_cell" /> | 16,384 | 63    | 128       | 51       | 10       | 9    | 1        |
| <ItemLink id="appliedenergistics2:64k_item_storage_cell" /> | 65,536 | 63    | 512       | 153      | 20       | 27   | 4        |

#### Storage Capacity with Varying Type Count

| Cell                                                        | Stacks of items With 1 Item In Cell | Stacks of items With 63 Items in Cell |
| ----------------------------------------------------------- | ----------------------------------- | ------------------------------------- |
| <ItemLink id="appliedenergistics2:1k_item_storage_cell" />  | 127                                 | 65                                    |
| <ItemLink id="appliedenergistics2:4k_item_storage_cell" />  | 508                                 | 260                                   |
| <ItemLink id="appliedenergistics2:16k_item_storage_cell" /> | 2,032                               | 1,040                                 |
| <ItemLink id="appliedenergistics2:64k_item_storage_cell" /> | 8,128                               | 4,160                                 |

## Fluid Storage

## Spatial Storage
