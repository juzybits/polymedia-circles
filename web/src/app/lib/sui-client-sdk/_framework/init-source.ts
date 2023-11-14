import * as package_1 from "../_dependencies/source/0x1/init";
import * as package_2 from "../_dependencies/source/0x2/init";
import * as package_80e2692471f5d79cd5f2dd9e8fa9ee1166de688fecd9abf65494d5d633bdf71b from "../polymedia-circles/init";
import { structClassLoaderSource as structClassLoader } from "./loader";

let initialized = false;
export function initLoaderIfNeeded() {
  if (initialized) {
    return;
  }
  initialized = true;
  package_1.registerClasses(structClassLoader);
  package_2.registerClasses(structClassLoader);
  package_80e2692471f5d79cd5f2dd9e8fa9ee1166de688fecd9abf65494d5d633bdf71b.registerClasses(
    structClassLoader,
  );
}
