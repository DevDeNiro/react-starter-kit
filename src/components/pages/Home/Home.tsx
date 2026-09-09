import {useState} from "react";
import {User} from "oidc-client-ts";
import {FormattedMessage} from "react-intl";
import {Card, EmptyState, SearchBar} from "@components/common";
import {HomeWrapper} from "@components/pages/Home/Home.styled.tsx";

interface HomeProps {
    user?: User | null;
}

const Home = ({user}: HomeProps) => {
    const [search, setSearch] = useState("");

    return (
        <HomeWrapper>
            <Card
                title="Application métier"
                description="Point de départ à adapter à votre prochain domaine fonctionnel."
            >
                <SearchBar
                    value={search}
                    onChange={setSearch}
                    placeholder="Rechercher dans l'application"
                />
                <p>
                    <FormattedMessage
                        id="app.header.status"
                        defaultMessage="Statut : {userStatus}"
                        values={{
                            userStatus: user
                                ? user.profile.name ?? "connecté"
                                : "visiteur",
                        }}
                    />
                </p>
                {!search && (
                    <EmptyState
                        title="Commencez par personnaliser cet écran"
                        description="Les composants communs et le thème sont prêts à être composés."
                    />
                )}
            </Card>
        </HomeWrapper>
    );
};

export default Home;
