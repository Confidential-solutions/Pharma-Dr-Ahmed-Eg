import type { LocaleDictionary } from "../types";
import { arCommon } from "./common";
import { arHome } from "./home";
import { arServices } from "./services";
import { arAbout } from "./about";
import { arContact } from "./contact";
import { arLocation } from "./location";
import { arGallery } from "./gallery";
import { arAuth } from "./auth";
import { arErrors } from "./errors";

export const ar: LocaleDictionary = {
  ...arCommon,
  ...arHome,
  ...arServices,
  ...arAbout,
  ...arContact,
  ...arLocation,
  ...arGallery,
  ...arAuth,
  ...arErrors,
};

