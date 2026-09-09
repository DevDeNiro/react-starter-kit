import type {Meta, StoryObj} from "@storybook/react";
import {useState} from "react";
import {Badge, Card, EmptyState, Input, Modal, SearchBar, Spinner} from ".";

const meta = {
    title: "Common",
    parameters: {
        layout: "centered",
    },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;
function CatalogueView() {
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div style={{display: "grid", gap: "1rem", width: "min(90vw, 36rem)"}}>
            <SearchBar value={search} onChange={setSearch} />
            <Input label="Nom" placeholder="Saisir un nom" hint="Champ réutilisable avec aide contextuelle." />
            <Card title="Carte métier" description="Une composition commune à personnaliser.">
                <div style={{display: "flex", gap: "0.5rem"}}>
                    <Badge tone="success">Actif</Badge>
                    <Badge tone="warning">À vérifier</Badge>
                    <Badge tone="danger">Erreur</Badge>
                </div>
            </Card>
            <EmptyState title="Aucun résultat" description="L’état vide est explicite et actionnable." />
            <button type="button" onClick={() => setModalOpen(true)}>Ouvrir la modale</button>
            <Modal open={modalOpen} title="Modale commune" onClose={() => setModalOpen(false)}>
                Contenu de la modale.
            </Modal>
            <Spinner label="Chargement des données" />
        </div>
    );
}

export const Catalogue: Story = {
    render: () => <CatalogueView />,
};
