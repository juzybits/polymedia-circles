import * as package_1 from "../_dependencies/source/0x1/init";
import * as package_2 from "../_dependencies/source/0x2/init";
import * as package_2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092 from "../polymedia-circles/init";
import { structClassLoaderSource as structClassLoader } from "./loader";

let initialized = false;
export function initLoaderIfNeeded() {
  if (initialized) {
    return;
  }
  initialized = true;
  package_1.registerClasses(structClassLoader);
  package_2.registerClasses(structClassLoader);
  package_2879dbb3b3e6a7f65ae0ccead8e1b3474e7c773c490a6479e112a3d393da5092.registerClasses(
    structClassLoader,
  );
}
