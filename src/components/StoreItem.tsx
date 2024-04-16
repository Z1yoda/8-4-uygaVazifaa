import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContex";
import book from "/imgs/book.jpg";
import banana from "/imgs/banana.jpg";
import computer from "/imgs/computer.jpg";
import car from "/imgs/car.jpg";

type StoreItemProps = {
    id: number;
    name: string;
    price: number;
    // imgUrl: string;
};

export function StoreItem({ id, name, price }: StoreItemProps) {
    const {
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
    } = useShoppingCart();

    const quantity = getItemQuantity(id);

    // Set image source based on item ID
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
                return ""; // Provide a default value or handle the case where no image is found
        }
    };

    return (
        <Card className="h-100">
            <Card.Img
                variant="top"
                src={getImageSrc(id)}
                alt={name} // Provide alt text for accessibility
                height="200px"
                style={{ objectFit: "cover" }}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{formatCurrency(price)}</span>
                </Card.Title>
                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button className="w-100" onClick={() => increaseCartQuantity(id)}>+ Add To Cart</Button>
                    ) : (
                        <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
                            <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }}>
                                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                                <div>
                                    <span className="fs-3">{quantity}</span> in cart
                                </div>
                                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                            </div>
                            <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>Remove</Button>
                        </div>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}
