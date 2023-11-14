import * as artwork from "./artwork/structs";
import * as circle from "./circle/structs";
import * as collection from "./collection/structs";
import * as controller from "./controller/structs";
import { StructClassLoader } from "../_framework/loader";

export function registerClasses(loader: StructClassLoader) {
  loader.register(circle.Circle);
  loader.register(artwork.ARTWORK);
  loader.register(artwork.Artwork);
  loader.register(collection.Collection);
  loader.register(controller.ArtworkBlended);
  loader.register(controller.ArtworkBurned);
  loader.register(controller.ArtworkFrozen);
  loader.register(controller.ArtworkMinted);
  loader.register(controller.ArtworkRecycled);
}
