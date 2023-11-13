import * as package_1 from "../_dependencies/source/0x1/init";
import * as package_2 from "../_dependencies/source/0x2/init";
import * as package_fbe14b58a0d88b43908491f87f59b07375a2618df5a5fef855c84f01ff4739bd from "../polymedia-circles/init";
import { structClassLoaderSource as structClassLoader } from "./loader";

let initialized = false;
export function initLoaderIfNeeded() {
  if (initialized) {
    return;
  }
  initialized = true;
  package_1.registerClasses(structClassLoader);
  package_2.registerClasses(structClassLoader);
  package_fbe14b58a0d88b43908491f87f59b07375a2618df5a5fef855c84f01ff4739bd.registerClasses(
    structClassLoader,
  );
}
