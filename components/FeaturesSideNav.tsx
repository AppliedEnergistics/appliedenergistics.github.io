import React from "react";
import { allPages } from "../data/site-data";
import { useRouter } from "next/router";
import Link from "next/link";
import { getItemInfo } from "../data/game-data";

const sideNav: MenuEntry[] = [
  {
    header: "Introduction",
    children: [
      "getting-started.md",
      "frequently-asked-questions.md",
      "miscellaneous-tips.md",
      "customizing-ae2.md",
      {
        title: "API",
        path: "api.md"
      },
      "debug-card.md"
    ],
  },
  {
    header: "Mechanics",
    children: [
      "features/crystals.md",
      "features/meteorites.md",
      "features/auto-crafting.md",
      "features/me-network/powered-machines/inscriber.md",
    ],
  },
  {
    header: "ME Networks",
    children: [
      {
        title: "Overview",
        path: "features/me-network.md",
      },
      "features/me-network/channels.md",
      "features/me-network/ad-hoc-networks.md",
      "features/me-network/cables.md",
      "features/me-network/storage-cells.md",
      "features/me-network/network-energy.md",
      "features/me-network/terminals.md",
      "features/me-network/monitors.md",
      "features/me-network/wireless-access.md",
      "features/me-network/quantum-bridge.md",
      "features/me-network/misc/p2p-tunnel.md",
    ],
  },
  {
    header: "Simple Tools",
    children: [
      "features/simple-tools/quartz-tools.md",
      "features/simple-tools/cutting-knife.md",
      "features/simple-tools/wrench.md",
      "features/simple-tools/sky-stone-chest.md",
      "features/simple-tools/light-detecting-fixture.md",
      "features/simple-tools/tiny-tnt.md",
    ],
  },
  {
    header: "Decorative Blocks",
    children: [
      "features/decorative-blocks/certus-quartz.md",
      "features/decorative-blocks/quartz-glass.md",
      "features/decorative-blocks/sky-stone.md",
      "features/decorative-blocks/fluix.md",
      "features/decorative-blocks/quartz-fixture.md",
      "features/decorative-blocks/illuminated-panel.md",
      "features/decorative-blocks/cable-anchor.md",
      "features/decorative-blocks/cable-facade.md",
    ],
  },
];

interface PageLink {
  title: string;
  path: string;
}

interface MenuEntry {
  header: string;
  children: (string | PageLink)[];
}

function isPageLink(child: PageLink): boolean {
  return true;
}

function FeaturesSideNav() {
  const router = useRouter();
  const pageUrl = router.asPath + "/";

  function renderMenuEntry(entry: MenuEntry, key: string) {
    return (
      <React.Fragment key={key}>
        <p className="menu-label">{entry.header}</p>
        <ul className="menu-list">
          {entry.children.map((child, index) => {
            let pagePath: string;
            let pageTitle: string | undefined = undefined;
            if (typeof child === "string") {
              pagePath = child;
            } else {
              pagePath = child.path;
              pageTitle = child.title;
            }

            const page = allPages.find((p) => p.path === pagePath);
            if (!page) {
              throw new Error(`Failed to find page with path '${pagePath}'`);
            }

            let icon: string | undefined;
            if (page.sidenavIcon) {
              const item = getItemInfo(page.sidenavIcon);
              icon = item.icon;
            }

            const active = page.url === pageUrl;
            return (
              <li key={index}>
                <Link href={page.url} passHref>
                  <a className={active ? "is-active" : undefined}>
                    <div className="icon-text">
                      {icon ? (
                        <span className="icon">
                          <img src={icon} />
                        </span>
                      ) : null}
                      <span>{pageTitle ?? page.title}</span>
                    </div>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }

  return (
    <>{sideNav.map((entry, index) => renderMenuEntry(entry, "" + index))}</>
  );
}

export default FeaturesSideNav;
