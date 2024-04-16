import { Stack, Button } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContex"
import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/formatCurrency"
import book from "/imgs/book.jpg";
import banana from "/imgs/banana.jpg";
import computer from "/imgs/computer.jpg";
import car from "/imgs/car.jpg";

type CartItemProps = {
    id: number 
    quantity: number
}

export function CartItem({ id, quantity }: CartItemProps) {
    const { removeFromCart } = useShoppingCart()
    const item = storeItems.find(i => i.id === id)
    if (item == null) return null

       const getImageSrc = (itemId: number) => {
        switch (itemId) {
            case 1:
                return book;
            case 2:
                return computer;
            case 3:
                return banana;
            case 4:
                return car;
            default:
                return ""; 
        }
    };
    
    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={getImageSrc(item.id)}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div> {formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
    )
}