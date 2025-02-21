import {
  FaCompass,
  FaThLarge,
  FaBook,
  FaHeart,
  FaListAlt,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const sidebarItems = [
  { title: "Discover", icon: FaCompass, link: "/" },
  { title: "Category", icon: FaThLarge, link: "/category" },
  { title: "My Library", icon: FaBook, link: "/library" },
  { title: "Favorites", icon: FaHeart, link: "/favorites" },
  { title: "Wishlist", icon: FaListAlt, link: "/wishlist" },
  { title: "Settings", icon: FaCog, link: "/settings" },
  { title: "Help", icon: FaQuestionCircle, link: "/help" },
  { title: "Logout", icon: FaSignOutAlt, link: "/logout" },
];

export default sidebarItems;
