---
title: Custom Recipes
---

# Custom Recipes

Applied Energistics 2 is extremely configurable and supports 100% customize-
able recipes if desired, This page will direct you on how to get started.

## Getting Started

First you'll want to start the game for the first time with AE2 installed to
generate the config file. Once this is done you'll open it to find

...

crafting{  
B:CustomRecipes=false

...

Set this value to true, by doing this it will tell AE2 to load the recipes
from the config folder instead of the jar. Next you'll need to open the AE2
jar file and extract a few files, remember that the jar is just a zip file;

You'll want to open it up in your favorite archive tool, and navigate to
assets/appliedenergistics2/recipes. This folder will contain a number of files
such as index.recipe and tools.recipe; simply extract these files to your
config/AppliedEnergistics2/ folder.

Do not extract the folder, but rather its contents, so you should now have a
index.recipe file in your config/AppliedEnergistics2/ folder.

At this point if you load AE2 it should have the normal standard recipes
available. but now you can make changes to the recipe files.

## Making Changes

The recipe file is fairly simple; each recipe starts with the type= such as
"inscribe=" followed by a list of inputs then a "->" then the output.

### Item References

Each item is referenced by a name space, and a name, for example all of
minecrafts items use the namespace "minecraft" so a glass block would be
"minecraft:glass" if you use an alias you can shorten this to "mc:glass" for
instance.

The recipe system also exposes access to the oredictionary via a namespace, so
you can use "oredictionary:glass" to use any type of glass.

### Recipe Types

1. shapeless

   - takes up to 9 items as input
   - outputs a single item as output, optionally with quantity

2. shaped

   - takes up to 9 items as input, each row ends with a comma
   - outputs a single item as output, optionally with quantity

3. smelt

   - takes 1 item as input.
   - takes 1 item as output, optionally with quantity

4. grind
5. takes 1 item as input.
6. takes 1 item as output, optionally with quantity
7. inscribe
8. takes 2 or 3 items as input, first item is the center item.
9. takes 1 item as output, optionally with quantity
10. center item is consumed.
11. press
12. takes 2 or 3 items as input, first item is the center item.
13. takes 1 item as output, optionally with quantity.
14. all items are consumed.

### Recipe Functions

1. alias

   - creates a shorthand for a longer value for instance by default ae2 is mapped to appliedenergistics2

2. ore

   - lets you add items into an ore dictionary value.

3. group

   - lets you create a item group for 1 or more inputs.

4. import

   - lets you load an additional recipe file.

## Final Word

In closing, you'll probably want to explore the files to see how things work
and make changes you want by editing the files that are already there, if you
want to remove a recipe not found in the recipe files such as in world
crafting you must disable this in the AE2 config file.
