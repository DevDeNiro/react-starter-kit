// Extern
import { ChangeEvent, FC } from "react";
import { User } from "oidc-client-ts";
import { useDispatch, useSelector } from "react-redux";
import {
    FormattedMessage,
    injectIntl,
    WrappedComponentProps,
} from "react-intl";
import reactLogo from "@assets/react.svg";

// Intern
import { RootState } from "@redux/store.ts";
import Select from "@components/atoms/Select/Select.tsx";
import NavbarStyled from "@components/molecules/Navbar/Navbar.styled.tsx";
import NavItem from "@components/atoms/NavItem/NavItem.tsx";
import Button from "@components/atoms/Button/Button.tsx";
import { selectLanguage } from "@redux/intl/intlSlice.ts";
import BurgerButton from "@components/atoms/BurgerButton/BurgerButton.tsx";
import { selectOptions } from "@utils/selectTranslationValues.ts";
import { toggleVerticalMenu } from "@redux/menu/menuSlice.ts";

export interface NavbarProps extends WrappedComponentProps {
    handleLogout: () => void;
    handleLogin: () => void;
    handleShowMenu: () => void;
    user?: User | null;
    isAuthenticated: boolean;
}

const Navbar: FC<NavbarProps> = ({
    handleLogout,
    handleLogin,
    intl,
    user,
    isAuthenticated,
}) => {
    const intlState = useSelector((state: RootState) => state.intl);
    const menuState = useSelector(
        (state: RootState) => state.menu.showVerticalMenu,
    );

    const dispatch = useDispatch();

    const handleShowMenu = () => {
        dispatch(toggleVerticalMenu(!menuState));
    };

    return (
        <NavbarStyled role={"navigation"}>
            {/*Left Container*/}
            <div className={"left-container"}>
                <div
                    role={"img"}
                    aria-label={"Logo"}
                    className={"logo-wrapper"}
                >
                    <img src={reactLogo} alt={"Logo"} />
                </div>

                <span>
                    <FormattedMessage
                        id={"app.header.title"}
                        defaultMessage={"Hello world wep app !"}
                    />
                </span>
                <NavItem translationKey={"app.header.home"} linkTo={"/"} />
                {user && (
                    <NavItem
                        translationKey={"app.header.profile"}
                        linkTo={"/profile"}
                    />
                )}
            </div>

            {/*Right Container*/}
            <div className={"right-container"}>
                <span>
                    <FormattedMessage
                        id={"app.header.status"}
                        values={{
                            // status: isAuthenticated ? intlState.messages["app.header.logged"] : intlState.messages["app.header.notLogged"]
                            userStatus: intl.formatMessage({
                                id: user
                                    ? "app.header.status.loggedIn"
                                    : "app.header.status.loggedOut",
                                defaultMessage: user
                                    ? "Logged in"
                                    : "Logged out",
                            }),
                        }}
                    />
                </span>
                {!user && !isAuthenticated && (
                    <Button
                        hasPopup={false}
                        expanded={false}
                        logout={false}
                        handleClick={handleLogin}
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
                        expanded={false}
                        logout={true}
                        handleClick={handleLogout}
                    >
                        <FormattedMessage id={"app.header.logout"} />
                    </Button>
                )}

                {
                    <Select
                        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                            dispatch(selectLanguage(event))
                        }
                        options={selectOptions}
                        value={intlState.locale}
                    />
                }

                <BurgerButton
                    handleShowMenu={handleShowMenu}
                    hasPopup={true}
                    expanded={menuState.showVerticalMenu}
                />
            </div>
        </NavbarStyled>
    );
};
// react-refresh/only-export-components
const EnhancedNavbar = injectIntl(Navbar);
export default EnhancedNavbar;
