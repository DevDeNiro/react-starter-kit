import Button from "@components/atoms/Button/Button.tsx";
import {fn} from "@storybook/test";

export default {
  component: Button,
  title: "Atoms/Button",
  tags: ["autodocs"],
};

export const Default = {
  args: {
    children: "Click me",
    handleClick: fn(),
    logout: false,
  },
};

export const Logout = {
  args: {
    children: "Logout",
    handleClick: fn(),
    logout: true,
  },
};
