import {
  AdminPanelSettings,
  GridViewOutlined,
  Group,
  LibraryBooksSharp,
  MessageOutlined,
  OpenInNewOutlined,
  PostAdd,
  Settings,
  ShoppingBag,
  Store,
} from "@mui/icons-material";

export const menuItems = [
  {
    href: "/",
    icon: <OpenInNewOutlined />,
    label: "Visit Site",
    target: "_blank",
  },
  {
    href: "/admin",
    icon: <GridViewOutlined />,
    label: "Dashboard",
  },
  {
    href: "/admin/courses",
    icon: <LibraryBooksSharp />,
    label: "Courses",
    subItems: [
      { href: "/admin/course/create", label: "Create Course"},
      { href: "/admin/course/coupons", label: "Coupons"},
      { href: "/admin/course/categories", label: "Categories"},
      { href: "/admin/course/tags", label: "Tags"},
    ],
  },
  {
    href: "/admin/products",
    icon: <Store />,
    label: "Products",
    subItems: [
      { href: "/admin/product/create", label: "Create Product",},
      { href: "/admin/product/categories", label: "Categories",},
      { href: "/admin/product/tags", label: "Tags"},
    ],
  },
  {
    href: "/admin/orders",
    icon: <ShoppingBag />,
    label: "Orders",
  },
  {
    href: "/admin/posts",
    icon: <PostAdd />,
    label: "Posts",
    subItems: [
      { href: "/admin/post/create", label: "Create Post",},
      { href: "/admin/post/categories", label: "Categories",},
      { href: "/admin/post/tags", label: "Tags"},
    ],
  },
  {
    href: "/admin/messages",
    icon: <MessageOutlined />,
    label: "Messages",
  },
  {
    href: "/admin/profile",
    icon: <AdminPanelSettings />,
    label: "Profile",
  },
  {
    href: "/admin/users",
    icon: <Group />,
    label: "Users",
    subItems: [
      { href: "/admin/users/team", label: "Team",},
    ],
  },
  {
    href: "/admin/settings",
    icon: <Settings />,
    label: "Settings",
  },
];
