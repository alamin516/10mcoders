import {
  AdminPanelSettings,
  ColorLens,
  GridViewOutlined,
  Group,
  InsertChart,
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
    href: "#",
    icon: <LibraryBooksSharp />,
    label: "Courses",
    subItems: [
      { href: "/admin/courses", label: "All Courses"},
      { href: "/admin/course/create", label: "Create Course"},
      { href: "/admin/course/coupons", label: "Coupons"},
      { href: "/admin/course/categories", label: "Categories"},
      { href: "/admin/course/tags", label: "Tags"},
    ],
  },
  {
    href: "#",
    icon: <Store />,
    label: "Products",
    subItems: [
      { href: "/admin/products", label: "All Products",},
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
    href: "#",
    icon: <PostAdd />,
    label: "Posts",
    subItems: [
      { href: "/admin/posts", label: "All Posts",},
      { href: "/admin/post/create", label: "Create Post",},
      { href: "/admin/post/categories", label: "Categories",},
      { href: "/admin/post/tags", label: "Tags"},
    ],
  },
  {
    href: "#",
    icon: <ColorLens />,
    label: "Customization",
    subItems: [
      { href: "/admin/customization/hero", label: "Hero Section",},
      { href: "/admin/customization/faqs", label: "Faqs",},
      { href: "/admin/customization/categories", label: "Categories"},
    ],
  },
  {
    href: "#",
    icon: <InsertChart />,
    label: "Analytics",
    subItems: [
      { href: "/admin/analytics/courses", label: "Course"},
      { href: "/admin/analytics/orders", label: "Order",},
      { href: "/admin/analytics/users", label: "User",},
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
    href: "#",
    icon: <Group />,
    label: "Users",
    subItems: [
      { href: "/admin/users", label: "All Users",},
      { href: "/admin/users/team", label: "Team",},
    ],
  },
  {
    href: "/admin/settings",
    icon: <Settings />,
    label: "Settings",
  },
];
