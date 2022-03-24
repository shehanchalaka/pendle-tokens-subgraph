import { NewYieldContracts as NewYieldContractsEvent } from "../../generated/templates/IPendleForge/IPendleForge";
import { ERC20 as ERC20Template } from "../../generated/templates";

export function handleNewYieldContracts(event: NewYieldContractsEvent): void {
  ERC20Template.create(event.params.ot);
  ERC20Template.create(event.params.xyt);
}
