import {
  // FaCalendarCheck,
  FaChartLine,
  FaMapMarkerAlt,
  FaListAlt,
  FaBox,
  FaEnvelope,
  FaCog
} from "react-icons/fa";

import { PATH } from "./path";

export const SIDE_BAR_ITEMS = [
  {
    title: "Dashboard",
    children: [
      { title: "Main", link: PATH.dashboard },
      { title: "Analytics", link: PATH.analytics },
    ],
    icon: <FaChartLine className="text-2xl" />,
    link: "",
  },
  {
    title: "Location",
    children: [
      { title: "Continent", link: PATH.continent },
      { title: "Country", link: PATH.country },
    ],
    icon: <FaMapMarkerAlt className="text-2xl" />,
    link: "",
  },
  {
    title: "Attributes",
    children: [
      { title: "tour-types", link: PATH.tourType },
      { title: "accommodations", link: PATH.accommodations },
      { title: "activities", link: PATH.activities },
      { title: "age-range", link: PATH.ageRange },
      { title: "transports", link: PATH.transport },
      { title: "meals", link: PATH.meals },
    ],
    icon: <FaListAlt className="text-2xl" />,
    link: "",
  },
  {
    title: "Packages",
    link: PATH.package,
    icon: <FaBox className="text-2xl" />,
  },

  // {
  //   title: "Booking",
  //   link: PATH.booking,
  //   icon: <FaCalendarCheck className="text-2xl" />,
  // },

  {
    title: "Enquiry",
    link: PATH.enquiry,
    icon: <FaEnvelope className="text-2xl" />,
  },

  {
    title: "Settings",
    link: PATH.settings,
    icon: <FaCog className="text-2xl" />,
  },
];
