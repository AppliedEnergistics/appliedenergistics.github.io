---
title: Getting Started
---

## Early Game Progression

- Mine in the overworld for <ItemLink id="quartz_ore" /> and obtain <ItemLink id="certus_quartz_dust" />, and at least
  one <ItemLink id="certus_quartz_crystal" />.
- Build a <ItemLink id="charger" />, and power it with a <ItemLink id="vibration_chamber" /> or a generators from others
  mods.
- Use the charger to make a <ItemLink id="charged_certus_quartz_crystal" />, and build a <ItemLink id="sky_compass" />.
- To progress, you need to create <ItemLink id="fluix_crystal" />. You have two options:
  - Use the compass to find a [meteorite](./features/meteorites.md), where you might find
    some <ItemLink id="fluix_crystal" />.
  - Grow your first fluix crystals without a <ItemLink id="quartz_growth_accelerator" />. This will be slow, but can
    be done in bulk, and you don't need to wait around.
- To craft the processors required for more advanced machines, you'll need the <ItemLink id="inscriber" />. Each type of
  processor has an associated press, which you will find in [meteorites](./features/meteorites.md).

## My Very First Quartz

The first step to getting started in AE2 is to acquire Quartz. AE2 itself
adds <ItemLink id="appliedenergistics2:certus_quartz_crystal"/>, and makes use of
vanilla's <ItemLink id="minecraft:quartz"/> as well. The first tier of AE2 tech, such as
the <ItemLink id="appliedenergistics2:certus_quartz_wrench"/>
, <ItemLink id="appliedenergistics2:certus_quartz_cutting_knife"/>,
and [Certus Quartz tools](./features/simple-tools/quartz-tools.md), use <ItemLink id="certus_quartz_crystal" /> as the
primary crafting ingredient.

You'll notice that mining <ItemLink id="quartz_ore" /> primarily drops <ItemLink id="certus_quartz_dust" />.

To get more than the occasional crystal dropped from <ItemLink id="quartz_ore" />, you need
to [grow crystals from seeds](./features/crystals.md).

## Alright, I have a bunch of Certus and Nether Quartz; how do I move up in the world?

After some investigation, you've probably noticed that to move up through the tech tree you
need <ItemLink id="fluix_crystal"/>. <ItemLink id="appliedenergistics2:fluix_crystal"/> are made through the following
process:

1. Throw <ItemLink id="charged_certus_quartz_crystal" />, <ItemLink id="minecraft:quartz"/>, and <ItemLink id="minecraft:redstone"/> into a pool of
   water and wait. This will create <ItemLink id="fluix_dust" />.
2. Create <ItemLink id="fluix_crystal_seed" /> by combining <ItemLink id="fluix_dust" /> with <ItemLink id="minecraft:sand" />.
3. [Grow the seed](./features/crystals.md) in a pool of water.

You can create <ItemLink id="appliedenergistics2:charged_certus_quartz_crystal"/> in a Charger, which can be powered
by a <ItemLink id="vibration_chamber" /> full of coal.

Since growing crystals without any accelerators takes a long time, you should invest your first fluix crystals into
building as many <ItemLink id="quartz_growth_accelerator" /> as you can.

After this, you're set to start on the next level of tech with an <ItemLink id="appliedenergistics2:inscriber" />.

## Unlocking Technology - Hunting For The Last Few Pieces

### I can't make any of the circuits, and the plates for the Inscriber don't have a crafting recipe. Is AE2 broken?

No, AE2 isn't broken. The "final" pieces of the AE2 puzzle needed to move up the tech tree into ME Networks are the
Inscriber Presses. There are four presses that you need (Listed in order of "tier"):

<ItemGrid>
  <ItemIcon itemId="silicon_press" />
  <ItemIcon itemId="logic_processor_press" />
  <ItemIcon itemId="calculation_processor_press" />
  <ItemIcon itemId="engineering_processor_press" />
</ItemGrid>

These presses are used to make the Circuits needed for the Tech 2 machines and beyond. They're found randomly in <
ItemLink id="appliedenergistics2:sky_stone_chest"/>, which are located within Meteorites. Meteorites are randomly
spawned throughout the world, normally underground. So, the hunt begins!

This hunt is a little less aimless than the hunt for your first <ItemLink id="appliedenergistics2:
charged_certus_quartz_crystal"/>. You'll have a tool to help you on your way, the <ItemLink id="appliedenergistics2:
sky_compass"/>. The Compass will point you toward the chunk the meteor has generated in, not the specific block or the
center of the meteor itself. You'll have to do some digging and searching in order to find the meteor, and then you'll
have to take it apart and find the center, which is where the <ItemLink id="appliedenergistics2:sky_stone_chest"/> will
be located.

### I did it!

After this is where the fun starts. You now have all the tools to start making the complex pieces that Applied
Energistics has to offer! Get out there and start filling up data drives.

## Matter Energy Tech: ME Networks and Storage

### What is ME Storage?

Its pronounced Emm-Eee, and stands for Matter Energy.

Matter Energy is the main component of Applied Energistics 2, it's like a mad scientist version of a Multi-Block chest,
and it can revolutionize your storage situation. ME is extremely different then other storage systems in Minecraft, and
it might take a little out of the box thinking to get used to; but once you get started vast amounts of storage in tiny
space, and multiple access terminals are just the tip of the iceberg of what becomes possible.

### What do I need to know to get started?

First, ME Stores items inside of other items, called Storage Cells; there are 4 tiers with ever increasing amounts of
storage. In order to use a Storage Cell it must be placed inside either an <ItemLink id="appliedenergistics2:chest"/>,
or an <ItemLink id="appliedenergistics2:drive"/>.

<CategoryIndex category="Storage Cells" />

The <ItemLink id="appliedenergistics2:chest"/> shows you the contents of the Cell as soon as its placed inside, and you
can add and remove items from it as if it were a <ItemLink id="minecraft:chest"/>, with the exception that the items are
actually stored in the Storage cells, and not the <ItemLink id="appliedenergistics2:chest"/> itself.

While the <ItemLink id="appliedenergistics2:chest"/> is a great way to get introduced to the concept of ME, to really
take advantage you need to set up an [ME Network](features/me-network.md).

### How do I setup my first network?

An [ME Network](features/me-network.md) is pretty easy to get started you need 2 things,
an <ItemLink id="appliedenergistics2:chest"/> / or

<ItemLink id="appliedenergistics2:drive" />, and an <ItemLink id="appliedenergistics2:terminal" /> (
or <ItemLink
  id="
appliedenergistics2:crafting_terminal"
/> ) you'll also need some kind of cable, such as <ItemLink
  id="
appliedenergistics2:fluix_glass_cable"
/> to attach the <ItemLink id="appliedenergistics2:terminal" /> too.

Place all these next to each other, and you have the world's simplest network, storage and access.

You can add storage cells to the <ItemLink id="appliedenergistics2:drive"/>, or use one in a <ItemLink id="
appliedenergistics2:chest"/> for storage, and access it all from the <ItemLink id="appliedenergistics2:terminal"/>.

You might want to add more <ItemLink id="appliedenergistics2:terminal"/> to other rooms, for this you'll want to make
some <ItemLink id="appliedenergistics2:fluix_glass_cable"/>, any ME Blocks attached
to <ItemLink id="appliedenergistics2:fluix_glass_cable"/> will be connected to the [ME Network](features/me-network.md)

### Expanding your Network

So you have some basic storage, and access to that storage, its a good start, but you'll likely be looking to maybe
automate some processing.

A great example of this is to place a <ItemLink id="appliedenergistics2:item_export_bus"/> on the top of a furnace to
dump in ores, and a <ItemLink id="appliedenergistics2:item_import_bus"/>
on the bottom of the furance to extract furnaced ores.

The <ItemLink id="appliedenergistics2:item_export_bus"/> lets you export items from the network, into the attached
inventory, while the <ItemLink id="appliedenergistics2:item_import_bus"/> imports items from the attached inventory into
the network.

### Overcoming Limits

At this point you probably getting close to 8 or so devices, once you hit 9 devices you'll have to start
managing [channels](features/me-network/channels.md). Many devices but not all, require a [channel](features/me-network/channels.md) to
function. If the device deals solely with power, or connectivity like cables the device will not require
a [channel](features/me-network/channels.md). Anything that uses items, or moves them around, will.

By default network can support 8 [channels](features/me-network/channels.md), once you break this limit, you'll have to add an <
ItemLink id="appliedenergistics2:controller"/> to your network. this allows you to expand your network greatly.

Each face of the controller will output 32 [channels](features/me-network/channels.md), depending on whats is accepting
these [channels](features/me-network/channels.md) will determin how they get used, for instance, if you place a <ItemLink id="
appliedenergistics2:fluix_covered_dense_cable"/> next tohe controller you will beable to carry a full 32
[channels](features/me-network/channels.md), however if you place a <ItemLink id="appliedenergistics2:drive"/> next to it, or
non-dense cable, you will only get 8 [channels](features/me-network/channels.md).

### Tunneling

So your getting things started, but getting [channels](features/me-network/channels.md)
where you want them is kinda a nusance. Its time to start using <ItemLink id="appliedenergistics2:me_p2p_tunnel"/>.
These when configured for ME, allow you to move [channels](features/me-network/channels.md) from point to point; this allows you to
move up to 32 [channels](features/me-network/channels.md) per pair of <ItemLink id="appliedenergistics2:me_p2p_tunnel"/>.

![A example of using P2P Tunnels to move channels.](../public/assets/large/tunnelchannels.png)
