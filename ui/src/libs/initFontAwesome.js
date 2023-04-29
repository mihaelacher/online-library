import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faRightFromBracket,
  faArrowLeftLong,
  faCloudArrowUp,
  faCartShopping,
  faXmark,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

function initFontAwesome() {
  library.add(
    faRightFromBracket,
    faArrowLeftLong,
    faCloudArrowUp,
    faCartShopping,
    faXmark,
    faRightToBracket
  );
}

export default initFontAwesome;
