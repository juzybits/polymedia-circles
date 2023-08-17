import * as package_1 from "../_dependencies/source/0x1/init";
import * as package_2 from "../_dependencies/source/0x2/init";
import * as package_0 from "../polymedia-circles/init";
import { structClassLoaderSource as structClassLoader } from "./loader";

let initialized = false;
export function initLoaderIfNeeded() {
  if (initialized) {
    return;
  }
  initialized = true;
  package_0.registerClasses(structClassLoader);
  package_1.registerClasses(structClassLoader);
  package_2.registerClasses(structClassLoader);
}
