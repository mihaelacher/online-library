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
  faPaperPlane,
  faHeart,
  faHeartCrack,
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
    faUserGroup,
    faPaperPlane,
    faHeart,
    faHeartCrack
  );
}

export default initFontAwesome;
