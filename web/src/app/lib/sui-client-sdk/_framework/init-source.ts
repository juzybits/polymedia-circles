import * as package_1 from "../_dependencies/source/0x1/init";
import * as package_2 from "../_dependencies/source/0x2/init";
import * as package_72bf42d0555e5aee57fb603e844100af900826059c033f142bfd0a57de0a8b83 from "../polymedia-circles/init";
import { structClassLoaderSource as structClassLoader } from "./loader";

let initialized = false;
export function initLoaderIfNeeded() {
  if (initialized) {
    return;
  }
  initialized = true;
  package_1.registerClasses(structClassLoader);
  package_2.registerClasses(structClassLoader);
  package_72bf42d0555e5aee57fb603e844100af900826059c033f142bfd0a57de0a8b83.registerClasses(
    structClassLoader,
  );
}
