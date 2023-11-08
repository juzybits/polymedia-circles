import * as package_1 from "../_dependencies/source/0x1/init";
import * as package_2 from "../_dependencies/source/0x2/init";
import * as package_19de22f2de622b99b8266d23a40dbc69244683c5e48b7bfa3d014c1b1ae157f8 from "../polymedia-circles/init";
import { structClassLoaderSource as structClassLoader } from "./loader";

let initialized = false;
export function initLoaderIfNeeded() {
  if (initialized) {
    return;
  }
  initialized = true;
  package_1.registerClasses(structClassLoader);
  package_2.registerClasses(structClassLoader);
  package_19de22f2de622b99b8266d23a40dbc69244683c5e48b7bfa3d014c1b1ae157f8.registerClasses(
    structClassLoader,
  );
}
