import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import type { PaginatorButtonConfig } from "./types";

export const PaginationConfig: PaginatorButtonConfig = {
  first: {
    text: "First",
    icon: <DoubleArrowLeftIcon />,
    page: () => 1,
    disableOn: (currentPage) => currentPage === 1,
  },
  previous: {
    text: "Previous",
    icon: <ChevronLeftIcon />,
    page: (currentPage) => currentPage - 1,
    disableOn: (currentPage) => currentPage === 1,
  },
  next: {
    text: "Next",
    icon: <ChevronRightIcon />,
    page: (currentPage) => currentPage + 1,
    disableOn: (currentPage, totalPages) => currentPage === totalPages,
  },
  last: {
    text: "Last",
    icon: <DoubleArrowRightIcon />,
    page: (_, totalPages) => totalPages,
    disableOn: (currentPage, totalPages) => currentPage === totalPages,
  },
};
