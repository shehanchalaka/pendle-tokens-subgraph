import { dataSource } from "@graphprotocol/graph-ts";
import { Transfer as TransferEvent } from "../../generated/PendleToken/PendleToken";
import { Transfer } from "../../generated/schema";
import { getToken } from "../entities/token";
import { getUser } from "../entities/user";
import { getUserToken } from "../entities/userToken";
import { toDecimal } from "../utils/helpers";

export function handleTransfer(event: TransferEvent): void {
  let hash = event.transaction.hash.toHexString();
  let index = event.logIndex.toString();

  let token = getToken(dataSource.address().toHexString());
  let from = getUser(event.params.from.toHexString());
  let to = getUser(event.params.to.toHexString());
  let value = toDecimal(event.params.value, token.decimals);

  let transfer = new Transfer(hash + "-" + index);
  transfer.hash = hash;
  transfer.token = token.id;
  transfer.from = from.id;
  transfer.to = to.id;
  transfer.value = value;
  transfer.save();

  let toUserToken = getUserToken(to.id, token.id);
  toUserToken.totalReceived = toUserToken.totalReceived.plus(value);
  toUserToken.balance = toUserToken.balance.plus(value);
  toUserToken.save();

  let fromUserToken = getUserToken(from.id, token.id);
  fromUserToken.totalSent = fromUserToken.totalSent.plus(value);
  fromUserToken.balance = fromUserToken.balance.minus(value);
  fromUserToken.save();
}
