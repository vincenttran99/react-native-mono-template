/**
 * @author jamviet.com
 * @for Android and IOS, React Native
 * Xem file gốc Passport.ts
 *
 *  Cài thêm: react-native-device-info cho React Native để lấy được userAgent ... Tùy
 */

/** Cái này xài bcrypt.min.js từ package bcryptjs */
import bcryptooooo from "../helpers/encrypt.helper";
import DeviceInfo from "react-native-device-info";
import { MMKV } from "react-native-mmkv";

const PASSPORT_KEY = "68 61 6e 6f 69 64 65 70 6e 68 61 74 76 65 64 65 6d";
const hexToString = (hex: string) => {
  return hex
    .split(" ")
    .map((s) => String.fromCharCode(parseInt(s, 16)))
    .join("");
};

const MMKVStorage = new MMKV();
let UNIQUE_INFORMATION = MMKVStorage.getString("DeviceUniqueId") || "";
let USER_AGENT = MMKVStorage.getString("UserAgent") || "";

async function setUpDeviceUniqueId() {
  if (!MMKVStorage.getString("DeviceUniqueId")) {
    DeviceInfo.getUniqueId()
      .then((result) => {
        console.log(result, "resultresult");

        MMKVStorage.set("DeviceUniqueId", result);
        UNIQUE_INFORMATION = result;
      })
      .catch(() => console.log("setUpDeviceUniqueId UNIQUE_INFORMATION error"));
  }

  if (!MMKVStorage.getString("UserAgent")) {
    DeviceInfo.getUserAgent()
      .then((result) => {
        MMKVStorage.set("UserAgent", result);
        USER_AGENT = result;
      })
      .catch(() => console.log("setUpDeviceUniqueId USER_AGENT error"));
  }
}

setUpDeviceUniqueId();

export class MobileAppPassport {
  constructor() {}

  async init() {
    let __passport = await new bcryptooooo(UNIQUE_INFORMATION).SHA256();
    let __passport_verified = await new bcryptooooo(
      __passport + "" + USER_AGENT
    ).SHA256();
    let __passport_with_key = await this.cryptPassword(__passport);

    return {
      __passport,
      __passport_verified,
      __passport_with_key,
      USER_AGENT,
    };
  }

  /**
   * Add a hash to user password ...
   */

  async cryptPassword(password: string) {
    let HASH_KEY = hexToString(PASSPORT_KEY) + USER_AGENT;
    console.log(HASH_KEY, "HASH_KEY");
    return await new bcryptooooo(password + "" + HASH_KEY).encrypt("A");
  }
}
