import * as package_1 from "../_dependencies/source/0x1/init";
import * as package_2 from "../_dependencies/source/0x2/init";
import * as package_e2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed from "../polymedia-circles/init";
import { structClassLoaderSource as structClassLoader } from "./loader";

let initialized = false;
export function initLoaderIfNeeded() {
  if (initialized) {
    return;
  }
  initialized = true;
  package_1.registerClasses(structClassLoader);
  package_2.registerClasses(structClassLoader);
  package_e2a84474f9df1eb2936ce89d85769ddb11afa7a45771b4d70d801e1e747196ed.registerClasses(
    structClassLoader,
  );
}
