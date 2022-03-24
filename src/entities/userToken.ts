import { UserToken } from "../../generated/schema";
import { ZERO_BD } from "../utils/constants";

export function getUserToken(user: string, token: string): UserToken {
  let id = user + "-" + token;
  let userToken = UserToken.load(id);
  if (!userToken) {
    userToken = new UserToken(id);
    userToken.user = user;
    userToken.token = token;
    userToken.totalSent = ZERO_BD;
    userToken.totalReceived = ZERO_BD;
    userToken.balance = ZERO_BD;
    userToken.save();
  }
  return userToken;
}
