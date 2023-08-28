import React from "react";
import subnetworksImage from "./subnetworks.png";
import Image from "next/image";
import ButtonBar from "../components/ButtonBar";
import Head from "next/head";

function Index() {
  return (
    <>
      <Head>
        <title>Applied Energistics 2</title>
      </Head>
      <div className="block">
        <h1 className="title">Applied Energistics 2</h1>
        <h2 className="subtitle">Automation and Storage for Minecraft</h2>

        <ButtonBar />

        <div className="block">
          Applied Energistics 2 (AE2) is a comprehensive mod for Minecraft that
          introduces a unique approach to in-game inventory management. Its
          theme is centered around the concept of converting matter into energy
          and vice versa, to store and transport your items and fluids
          instantaneously!
        </div>

        <div className="block box content">
          <h2 className="title">Key Features</h2>
          <div className="block mt-1 mb-1">
            <Image
              src={subnetworksImage}
              alt="image of subnetworks from the guidebook"
            />
          </div>

          <p>
            <strong>Storage Systems</strong>: AE2 revolutionizes storage in
            Minecraft. The mod adds a network-based digital storage system,
            where items and blocks are stored as energy in a digital form within
            a network of connected devices. This allows for compact storage
            solutions and easy access to your items.
          </p>
          <p>
            <strong>Auto-Crafting</strong>: Another significant feature of AE2
            is its automatic crafting capabilities. Players can set up patterns
            and recipes which the system can automatically craft on demand. This
            greatly streamlines bulk and complex crafting processes, saving time
            and effort.
          </p>
          <p>
            <strong>Networking and Channels</strong>: AE2 adds a whole new level
            of strategy to your Minecraft builds with its networking and channel
            system. Devices connected to the same network can communicate and
            interact with each other, and the channel system limits the number
            of devices that can be connected to a single cable, adding a layer
            of planning and organization to your builds.
          </p>
          <p>
            <strong>Spatial Storage</strong>: This feature allows players to
            store entire regions of space within a spatial storage cell.
            Essentially, you can take a chunk of the world, including all
            blocks, items, and entities within, and store it digitally to be
            released later.
          </p>
          <p>
            <strong>Unique Resources</strong>: AE2 introduces several new
            resources and materials for crafting its technological components,
            such as Certus Quartz, Fluix Crystals, and Inscribers. Many of these
            new materials come with their own decorative blocks to spice up your
            builds.
          </p>
          <div className="block">
            AE2 is known for the complexity and depth it adds to Minecraft&#39;s
            tech gameplay, encouraging players to create, optimize, and manage
            large-scale, efficient systems. It is a fantastic mod for those who
            love to automate processes and manage resources efficiently.
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
