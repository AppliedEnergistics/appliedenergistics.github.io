---
categories:
  - ME Network/Misc
item_ids:
  - appliedenergistics2:me_p2p_tunnel
title: P2P Tunnel
---

<ItemLink id="appliedenergistics2:me_p2p_tunnel"/>

or "Point to Point Tunnels" are a versatile configurable system to move items
/ redstone / power / and fluids from one location to another though an
existing [ME Network](../../me-network.md) without storage.

Tunnels are 1 input to N outputs. This means you can output to as many points
as you want, but only input at a single point per tunnel.

Networks can support any number of tunnels, of any different types, and they
all function independently.

ME Tunnels can be used to carry channels from one location to another, and can
carry up to 32 [channels](../../channels.md), same as a <ItemLink
id="appliedenergistics2:fluix_covered_dense_cable"/>, while only
requiring a single channel per point, making tunnels a very powerful tool to
expand [me networks](../../me-network.md), especially over a distance.
However with the great flex-ability they give you comes a limitation, the
channel of a p2p tunnel cannot be carried by another p2p tunnel, meaning that
you cannot nest them recursively.

To configure a <ItemLink id="appliedenergistics2:me_p2p_tunnel"/>
you must first attune the tunnel to carry what you want it to, then you need
to configure the outputs to their input. You configure the connections by
using the <ItemLink id="appliedenergistics2:memory_card"/>; First
Shift+Right Click the input to save it on your memory card, then simply right
click the different outputs to store the input onto the outputs. this also
sets the type of the output to match the type of the input.

Tunnels can be attuned by right clicking on them with different types of
items:

<RecipeFor id="appliedenergistics2:me_p2p_tunnel"/>
