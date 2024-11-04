import Button from "@components/atoms/Button/Button.tsx";

export default {
  component: Button,
  title: "Atoms/Button",
  tags: ["autodocs"],
};

export const Default = {
  args: {
    children: "Click me",
    isLogout: false,
  },
};

export const Logout = {
  args: {
    children: "Logout",
    isLogout: true,
  },
};
