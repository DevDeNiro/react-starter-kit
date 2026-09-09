import type {Preview} from "@storybook/react";
import {IntlProvider} from "react-intl";
import {MemoryRouter} from "react-router-dom";
import {ThemeProvider} from "styled-components";
import {theme} from "../src/shared/theme";

const preview: Preview = {
    decorators: [
        (Story) => (
            <ThemeProvider theme={theme}>
                <IntlProvider locale="fr" messages={{}}>
                    <MemoryRouter>
                        <Story/>
                    </MemoryRouter>
                </IntlProvider>
            </ThemeProvider>
        ),
    ],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
