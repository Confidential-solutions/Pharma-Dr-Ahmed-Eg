import type { LocaleDictionary } from "../types";
import { enCommon } from "./common";
import { enHome } from "./home";
import { enServices } from "./services";
import { enAbout } from "./about";
import { enContact } from "./contact";
import { enLocation } from "./location";
import { enGallery } from "./gallery";
import { enAuth } from "./auth";
import { enErrors } from "./errors";

export const en: LocaleDictionary = {
  ...enCommon,
  ...enHome,
  ...enServices,
  ...enAbout,
  ...enContact,
  ...enLocation,
  ...enGallery,
  ...enAuth,
  ...enErrors,
};

