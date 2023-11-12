import * as package_1 from "../_dependencies/source/0x1/init";
import * as package_2 from "../_dependencies/source/0x2/init";
import * as package_293794c66bd50bd7e2bdef561367419c1298b315775e31dfab38a2eb6b08ece1 from "../polymedia-circles/init";
import { structClassLoaderSource as structClassLoader } from "./loader";

let initialized = false;
export function initLoaderIfNeeded() {
  if (initialized) {
    return;
  }
  initialized = true;
  package_1.registerClasses(structClassLoader);
  package_2.registerClasses(structClassLoader);
  package_293794c66bd50bd7e2bdef561367419c1298b315775e31dfab38a2eb6b08ece1.registerClasses(
    structClassLoader,
  );
}
