import { Token } from "../../generated/schema";
import { ERC20 } from "../../generated/PendleToken/ERC20";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { ZERO_BI } from "../utils/constants";

export function getToken(address: string): Token {
  let token = Token.load(address);
  if (!token) {
    token = new Token(address);
    token.name = getName(address);
    token.symbol = getSymbol(address);
    token.decimals = getDecimals(address);
    token.save();
  }
  return token;
}

function getName(address: string): string {
  let contract = ERC20.bind(Address.fromString(address));
  const result = contract.try_name();
  if (result.reverted) {
    return "unknown";
  }
  return result.value;
}

function getSymbol(address: string): string {
  let contract = ERC20.bind(Address.fromString(address));
  const result = contract.try_symbol();
  if (result.reverted) {
    return "unknown";
  }
  return result.value;
}

function getDecimals(address: string): BigInt {
  let contract = ERC20.bind(Address.fromString(address));
  const result = contract.try_decimals();
  if (result.reverted) {
    return BigInt.fromString("0");
  }
  return BigInt.fromI32(result.value);
}
