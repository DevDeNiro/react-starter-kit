// Extern
import {ChangeEvent, FC} from "react";
import {User} from "oidc-client-ts";
import {useDispatch, useSelector} from "react-redux";
import {FormattedMessage, injectIntl, WrappedComponentProps,} from "react-intl";
import reactLogo from "@/shared/assets/react.svg";

// Intern
import {RootState} from "@/app/store.ts";
import Select from "@components/atoms/Select/Select.tsx";
import NavbarStyled from "@components/molecules/Navbar/Navbar.styled.tsx";
import NavItem from "@components/atoms/NavItem/NavItem.tsx";
import Button from "@components/atoms/Button/Button.tsx";
import {selectLanguage} from "@/app/slices/intl/intlSlice.ts";
import BurgerButton from "@components/atoms/BurgerButton/BurgerButton.tsx";
import {selectOptions} from "@/shared/utils/selectTranslationValues.ts";
import {toggleVerticalMenu} from "@/app/slices/menu/menuSlice.ts";

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
    const menuState = useSelector((state: RootState) => state.menu);

    const dispatch = useDispatch();

    const handleShowMenu = () => {
        dispatch(toggleVerticalMenu(!menuState.showVerticalMenu));
    };

    return (
        <NavbarStyled role={"nav"}>
            {/*Left Container*/}
            <div className={"left-container"}>
                <div role={"img"} aria-label={"Logo"} className={"logo-wrapper"}>
                    <img src={reactLogo} alt={"Logo"}/>
                </div>

                <span>
          <FormattedMessage
              id={"app.header.title"}
              defaultMessage={"Hello world web app !"}
          />
        </span>

                {/* Navigation items - masqués sur mobile/tablet */}
                <div className="nav-items">
                    <NavItem translationKey={"app.header.home"} linkTo={"/"}/>
                    {user && (
                        <NavItem translationKey={"app.header.profile"} linkTo={"/profile"}/>
                    )}
                </div>
            </div>

            {/*Right Container*/}
            <div className={"right-container"}>
                {/* Éléments masqués sur mobile/tablet */}
                <div className="desktop-only">
          <span>
            <FormattedMessage
                id={"app.header.status"}
                values={{
                    userStatus: intl.formatMessage({
                        id: user
                            ? "app.header.status.loggedIn"
                            : "app.header.status.loggedOut",
                        defaultMessage: user ? "Logged in" : "Logged out",
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
                                values={{loginMode: "OAuth2"}}
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
                            <FormattedMessage id={"app.header.logout"}/>
                        </Button>
                    )}

                    <Select
                        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                            dispatch(selectLanguage(event))
                        }
                        options={selectOptions}
                        value={intlState.locale}
                    />
                </div>

                {/* Burger button - visible seulement sur mobile/tablet */}
                <BurgerButton
                    handleShowMenu={handleShowMenu}
                    hasPopup={true}
                    expanded={menuState.showVerticalMenu}
                />
            </div>
        </NavbarStyled>
    );
};

const EnhancedNavbar = injectIntl(Navbar);
export default EnhancedNavbar;