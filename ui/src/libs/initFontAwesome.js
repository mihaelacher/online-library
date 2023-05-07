import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faRightFromBracket,
  faArrowLeftLong,
  faCloudArrowUp,
  faCartShopping,
  faXmark,
  faRightToBracket,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

function initFontAwesome() {
  library.add(
    faRightFromBracket,
    faArrowLeftLong,
    faCloudArrowUp,
    faCartShopping,
    faXmark,
    faRightToBracket,
    faMagnifyingGlass
  );
}

export default initFontAwesome;
