import * as package_1 from "../_dependencies/source/0x1/init";
import * as package_2 from "../_dependencies/source/0x2/init";
import * as package_acbe5ab5d70076f911d539a10b371406f001c2ea1ceac1ee3ddfcad1e38c39b4 from "../polymedia-circles/init";
import { structClassLoaderSource as structClassLoader } from "./loader";

let initialized = false;
export function initLoaderIfNeeded() {
  if (initialized) {
    return;
  }
  initialized = true;
  package_1.registerClasses(structClassLoader);
  package_2.registerClasses(structClassLoader);
  package_acbe5ab5d70076f911d539a10b371406f001c2ea1ceac1ee3ddfcad1e38c39b4.registerClasses(
    structClassLoader,
  );
}
