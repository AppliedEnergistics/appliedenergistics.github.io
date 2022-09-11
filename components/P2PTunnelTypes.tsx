import React from "react";
import {
  getItemInfo,
  isColoredVariant,
  p2pTunnelTypes,
  P2PTypeInfo,
} from "../data/game-data";
import ItemLink from "./ItemLink";

/**
 * Nicer descriptions for API based attunement
 */
const APIDescriptions: Record<string, string> = {
  "net.fabricmc.fabric.api.transfer.v1.storage.Storage":
    "Portable Fabric Fluid Storage (i.e. Tanks, Buckets)",
  "team.reborn.energy.api.EnergyStorage":
    "Portable TechReborn Energy Storage (i.e. Batteries)",
};

interface P2PTunnelTypeProps {
  typeInfo: P2PTypeInfo;
}

function P2PTunnelType({ typeInfo }: P2PTunnelTypeProps) {
  const tunnelItem = getItemInfo(typeInfo.tunnelItemId);

  // Filter out all items that are just colored versions of something else.
  // This is included here for colored ME cables
  const attunementItemIds = typeInfo.attunementItemIds.filter(
    (i) => !isColoredVariant(i)
  );

  return (
    <>
      <h3>{tunnelItem.displayName}</h3>
      {/* List all items that can be used to attune this P2P tunnel type */}
      {attunementItemIds.length ? (
        <>
          This type of P2P-Tunnel can be attuned by right-clicking a tunnel part
          with one of the following items:
          <ul>
            {attunementItemIds.map((itemId, index) => (
              <li key={index}>
                <ItemLink id={itemId} />
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {/* List all APIs that can be used to attune this P2P tunnel type */}
      {typeInfo.attunementApiClasses.length ? (
        <>
          It can also be attuned by right-clicking a tunnel part with an item
          that provides one of the following functionalities:
          <ul>
            {typeInfo.attunementApiClasses.map((apiClass, index) => (
              <li key={index}>{APIDescriptions[apiClass] ?? apiClass}</li>
            ))}
          </ul>
        </>
      ) : null}
    </>
  );
}

function P2PTunnelTypes() {
  return (
    <>
      {p2pTunnelTypes.map((typeInfo) => (
        <P2PTunnelType key={typeInfo.tunnelItemId} typeInfo={typeInfo} />
      ))}
    </>
  );
}

export default P2PTunnelTypes;
