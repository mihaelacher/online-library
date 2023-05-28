import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faRightFromBracket,
  faArrowLeftLong,
  faCloudArrowUp,
  faCartShopping,
  faXmark,
  faRightToBracket,
  faMagnifyingGlass,
  faHouse,
  faUser,
  faBook,
  faComments,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

function initFontAwesome() {
  library.add(
    faRightFromBracket,
    faArrowLeftLong,
    faCloudArrowUp,
    faCartShopping,
    faXmark,
    faRightToBracket,
    faMagnifyingGlass,
    faHouse,
    faUser,
    faBook,
    faComments,
    faUserGroup
  );
}

export default initFontAwesome;
