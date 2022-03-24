import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { ZERO_BI, ONE_BI } from "./constants";

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
  let bd = BigDecimal.fromString("1");
  for (let i = ZERO_BI; i.gt(decimals as BigInt); i = i.minus(ONE_BI)) {
    bd = bd.div(BigDecimal.fromString("10"));
  }

  for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
    bd = bd.times(BigDecimal.fromString("10"));
  }
  return bd;
}

export function toDecimal(amount: BigInt, decimals: BigInt): BigDecimal {
  return amount.toBigDecimal().div(exponentToBigDecimal(decimals));
}
