// External imports
import {
    FormattedMessage,
    injectIntl,
    WrappedComponentProps,
} from "react-intl";
import { User } from "oidc-client-ts";
import { ChangeEvent, FC, useRef } from "react";
import { RootState } from "@redux/store.ts";
import { useDispatch, useSelector } from "react-redux";

// Local imports
import Select from "@components/atoms/Select/Select.tsx";
import VerticalMenuStyled from "@components/molecules/VerticalMenu/VerticalMenu.styled.tsx";
import NavItem from "@components/atoms/NavItem/NavItem.tsx";
import Button from "@components/atoms/Button/Button.tsx";
import { selectLanguage } from "@redux/intl/intlSlice.ts";
import { selectOptions } from "@utils/selectTranslationValues.ts";

export interface VerticalMenuProps extends WrappedComponentProps {
    onMenuItemClick: () => void;
    handleLogin: () => void;
    handleLogout: () => void;
    isAuthenticated: boolean;
    user?: User | null;
    className?: string;
}

const VerticalMenu: FC<VerticalMenuProps> = ({
    onMenuItemClick,
    handleLogin,
    handleLogout,
    isAuthenticated,
    intl,
    user,
    className,
}) => {
    const verticalMenuRef = useRef<HTMLDivElement>(null);
    const intlState = useSelector((state: RootState) => state.intl);
    const menuState = useSelector((state: RootState) => state.menu);
    const dispatch = useDispatch();

    return (
        <VerticalMenuStyled className={className} ref={verticalMenuRef}>
            <div className="vertical-menu-content">
                <FormattedMessage
                    id={"app.header.title"}
                    values={{
                        userStatus: intl.formatMessage(
                            {
                                id: user
                                    ? "app.header.status.loggedIn"
                                    : "app.header.status.loggedOut",
                                defaultMessage: user
                                    ? "Logged in as {name}"
                                    : "Logged out",
                            },
                            { name: user?.profile.name },
                        ),
                    }}
                />

                <NavItem
                    translationKey={"app.header.home"}
                    linkTo={"/"}
                    onClick={onMenuItemClick}
                />
                {user && (
                    <NavItem
                        translationKey={"app.header.profile"}
                        linkTo={"/profile"}
                        onClick={onMenuItemClick}
                    />
                )}
                {!user && !isAuthenticated && (
                    <Button
                        hasPopup={true}
                        expanded={menuState.showVerticalMenu}
                        logout={false}
                        handleClick={() => {
                            handleLogin();
                            onMenuItemClick();
                        }}
                    >
                        <FormattedMessage
                            id={"app.header.login"}
                            values={{ loginMode: "OAuth2" }}
                        />
                    </Button>
                )}
                {user && (
                    <Button
                        hasPopup={false}
                        expanded={menuState.showVerticalMenu}
                        logout={true}
                        handleClick={() => {
                            handleLogout();
                            onMenuItemClick();
                        }}
                    >
                        <FormattedMessage id={"app.header.logout"} />
                    </Button>
                )}

                <Select
                    onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                        dispatch(selectLanguage(event))
                    }
                    options={selectOptions}
                    value={intlState.locale}
                ></Select>
            </div>
        </VerticalMenuStyled>
    );
};

// react-refresh/only-export-components
const EnhancedVerticalMenu = injectIntl(VerticalMenu);
export default EnhancedVerticalMenu;
