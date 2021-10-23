import Icon from "@mdi/react";
import { mdiGithub } from "@mdi/js";
import React from "react";

function Download() {
  return (
    <>
      <h1 className="title">Downloads</h1>

      <div className="content">
        <p>
          You can download AE2 for various Minecraft versions from either
          CurseForge or GitHub.
        </p>
        <p>
          Any other site offering AE2 for download is not doing so officially.
          Since AE2 is open-source, it can be freely redistributed under the
          terms of the{" "}
          <a href="https://www.gnu.org/licenses/lgpl-3.0.html">GNU LGPL</a>.
        </p>
      </div>

      <div className="downloadButtons">
        <a
          className="button is-large"
          href="https://www.curseforge.com/minecraft/mc-mods/applied-energistics-2/files/all"
        >
          <span className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2017 853 43 23">
              <path
                d="M-2005.7,853l0.7,3c-3.5,0-12,0-12,0s0.2,0.9,0.3,1c0.3,0.5,0.6,1.1,1,1.5c1.9,2.2,5.2,3.1,7.9,3.6
	c1.9,0.4,3.8,0.5,5.7,0.6l2.2,5.9h1.2l0.7,1.9h-1l-1.7,5.5h16.7l-1.7-5.5h-1l0.7-1.9h1.2c0,0,1-6.1,4.1-8.9c3-2.8,6.7-3.2,6.7-3.2
	V853H-2005.7z M-1988.9,868.1c-0.8,0.5-1.7,0.5-2.3,0.9c-0.4,0.2-0.6,0.8-0.6,0.8c-0.4-0.9-0.9-1.2-1.5-1.4
	c-0.6-0.2-1.7-0.1-3.2-1.4c-1-0.9-1.1-2.1-1-2.7v-0.1c0-0.1,0-0.1,0-0.2s0-0.2,0.1-0.3l0,0l0,0c0.2-0.6,0.7-1.2,1.7-1.6
	c0,0-0.7,1,0,2c0.4,0.6,1.2,0.9,1.9,0.5c0.3-0.2,0.5-0.6,0.6-0.9c0.2-0.7,0.2-1.4-0.4-1.9c-0.9-0.8-1.1-1.9-0.5-2.6
	c0,0,0.2,0.9,1.1,0.8c0.6,0,0.6-0.2,0.4-0.4c-0.1-0.3-1.4-2.2,0.5-3.6c0,0,1.2-0.8,2.6-0.7c-0.8,0.1-1.7,0.6-2,1.4c0,0,0,0,0,0.1
	c-0.3,0.8-0.1,1.7,0.5,2.5c0.4,0.6,0.9,1.1,1.1,1.9c-0.3-0.1-0.5,0-0.7,0.2c-0.2,0.2-0.3,0.6-0.2,0.9c0.1,0.2,0.3,0.4,0.5,0.4
	c0.1,0,0.1,0,0.2,0h0.1c0.3-0.1,0.5-0.5,0.4-0.8c0.2,0.2,0.3,0.7,0.2,1c0,0.3-0.2,0.6-0.3,0.8c-0.1,0.2-0.3,0.4-0.4,0.6
	s-0.2,0.4-0.2,0.6c0,0.2,0,0.5,0.1,0.7c0.4,0.6,1.2,0,1.4-0.5c0.3-0.6,0.2-1.3-0.2-1.9c0,0,0.7,0.4,1.2,1.8
	C-1987.4,866.2-1988.1,867.6-1988.9,868.1z"
              />
            </svg>
          </span>
          <span>Download from CurseForge</span>
        </a>

        <a
          className="button is-large"
          href="https://github.com/AppliedEnergistics/Applied-Energistics-2/releases"
        >
          <span className="icon">
            <Icon path={mdiGithub} color="#181717" />
          </span>
          <span>Download from GitHub</span>
        </a>
      </div>
    </>
  );
}

export default Download;
