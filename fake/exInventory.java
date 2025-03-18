public class StackArticle {
private final UniqueId id;
private final skuCode;
private final StockQuantity quantityAvailable;
private final Integer quantityReserved;
private final StockMovement stockMovement;
private final AlertThreshold alertThreshold;
private final List<ReservedItem> reservedItem;
}

public record StockQuantity(Integer value){}
public record StockMovement(StockQuantity quantity, LocalDateTime movementDate, MovementType flowType) {}
public record AlertThreshold(Integer threshold, AlertType alertType, NotificationChannel notificiationChannel) {}
public record ReservedItem(String cartId, String skuCode, StockQuantity quantity) {}

public enum MovementType{
RESERVATION,
CREATION,
CANCELLATION,
CONFIRMATION
}

# Ubiquitous Language & Architecture Notes

Ce document propose un langage partagé (*Ubiquitous Language*) pour l’application d’inventaire et décrit brièvement comment illustrer le concept de **chorégraphie** dans une architecture événementielle (*Event-Driven Architecture*, EDA).

---

## 1. Ubiquitous Language

### 1.1. Stock

- **Description**
  Représente l’entité racine d’agrégat (*aggregate root*) qui gère l’inventaire pour un produit (ou SKU) donné.
  - Maintient la **quantité disponible** et la **quantité réservée**
  - Gère l’évolution du stock via des **mouvements** (création, réservation, annulation, confirmation, etc.)
  - Déclenche éventuellement des **alertes** ou **événements de domaine** (ex. *`StockBelowThreshold`*) lorsqu’un seuil est franchi.

### 1.2. StockQuantity

- **Description**
  *Value Object* encapsulant un entier représentant la quantité (toujours ≥ 0).
  - Gère les invariants métier : pas de valeurs négatives, par exemple
  - Expose des méthodes d’addition/soustraction immuables

### 1.3. StockMovement

- **Description**
  *Value Object* décrivant un **mouvement de stock** unitaire.
  - Stocke le nombre d’unités modifiées, la date, et le type de mouvement
  - Exemple de types : `RESERVATION`, `CREATION`, `CANCELLATION`, `CONFIRMATION`
  - Permet un **historique** (parfois exploité en *Event Sourcing* ou pour l’audit)

### 1.4. AlertThreshold

- **Description**
  *Value Object* décrivant un **seuil d’alerte** pour le stock.
  - Inclut la valeur numérique du seuil
  - Un type d’alerte (ex. `LOW_STOCK`, `OVERSTOCK`)
  - Un canal de notification (ex. `EMAIL`, `SLACK`)
- **Remarque**
  Peut être **fixe** ou déterminé dynamiquement par une **policy** (ex. *SeasonalThresholdPolicy*).

### 1.5. ReservedItem

- **Description**
  *Value Object* représentant une **réservation** de stock pour un `cartId`.
  - Contient le `skuCode`, la quantité réservée, et l’identifiant du panier
  - Permet de faire le lien entre un panier (dans un autre microservice e-commerce) et l’agrégat `Stock`

### 1.6. MovementType

- **Description**
  Énumération pour identifier la **nature** du mouvement dans l’inventaire.
  - `RESERVATION`, `CREATION`, `CANCELLATION`, `CONFIRMATION`, etc.
  - Sert à tracer la finalité de l’ajustement de stock

---

## 2. Illustrer le concept de Chorégraphie dans une Architecture EDA

Dans une **architecture orientée événements** (*Event-Driven Architecture*), la **chorégraphie** désigne un enchaînement d’actions déclenchées par des événements, **sans** qu’un orchestrateur central ne dicte l’ordre des appels. Chaque service réagit indépendamment à un événement qu’il consomme, puis publie éventuellement un nouvel événement pour signaler son propre changement d’état.

### 2.1. Exemple simplifié de chorégraphie

Afin d’illustrer la chorégraphie, on peut utiliser un **diagramme de séquence** ou un **diagramme d’événements** (Mermaid, PlantUML, etc.). Voici un petit schéma *Mermaid* pour un exemple e-commerce :

```mermaid
sequenceDiagram
    participant CartService
    participant InventoryService
    participant PaymentService

    CartService->>CartService: Checkout initiated (User clicks "Pay")
    note right of CartService: Publie un event "CheckoutStarted"

    CartService-->>InventoryService: Event "CheckoutStarted"
    note right of InventoryService: Réserve le stock, puis publie "StockReserved"

    InventoryService-->>PaymentService: Event "StockReserved"
    note right of PaymentService: Déclenche le paiement

    PaymentService-->>InventoryService: Event "PaymentCompleted"
    note right of InventoryService: Confirme la réservation, met à jour le stock

    PaymentService-->>CartService: Event "PaymentCompleted"
    note right of CartService: Met à jour le statut du panier