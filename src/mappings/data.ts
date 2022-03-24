import { ForgeAdded as ForgeAddedEvent } from "../../generated/PendleData/PendleData";
import { IPendleForge as PendleForgeTemplate } from "../../generated/templates";

export function handleForgeAdded(event: ForgeAddedEvent): void {
  PendleForgeTemplate.create(event.params.forgeAddress);
}
