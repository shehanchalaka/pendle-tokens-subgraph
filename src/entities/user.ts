import { User } from "../../generated/schema";

export function getUser(address: string): User {
  let user = User.load(address);
  if (!user) {
    user = new User(address);
    user.save();
  }
  return user;
}
