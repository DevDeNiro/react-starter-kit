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