import { dockShip } from "./dock-ship";
import { extractResources } from "./extract-resources";
import { getShipCooldown } from "./get-ship-cooldown";
import { getShips } from "./get-ships";
import { navigateShip } from "./navigate-ship";
import { orbitShip } from "./orbit-ship";
import { purchaseShip } from "./purchase-ship";
import { sellCargo } from "./sell-cargo";

export const FleetApi = {
  dockShip,
  extractResources,
  getShipCooldown,
  getShips,
  navigateShip,
  orbitShip,
  purchaseShip,
  sellCargo,
};
