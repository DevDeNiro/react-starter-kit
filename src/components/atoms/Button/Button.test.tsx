import Button, { ButtonProps } from "@components/atoms/Button/Button.tsx";

import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@storybook/test";

describe("Button", () => {
    const label = "Click me";

    const props: ButtonProps = {
        handleClick: vi.fn(),
        children: label,
        hasPopup: true,
        expanded: false,
        logout: true,
    };

    test(
        "should render button with label correctly, and call the onClick function when user click it",
        async () => {
            render(<Button {...props} />);
            const button = screen.getByText(label);
            expect(button).toBeInTheDocument();
            await userEvent.click(button);
            expect(props.handleClick).toHaveBeenCalled();
        },
        { timeout: 5000 },
    );
});
