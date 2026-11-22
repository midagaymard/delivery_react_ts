import styles from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store.ts";
import { cartActions } from "../../store/cart.slice.ts";
import type {CartItemProps} from "./CartItem.props.ts";

function CartItem(props: CartItemProps) {
    const dispatch = useDispatch<AppDispatch>();

    const increase = () => {
        dispatch(cartActions.add(props.id));
    };

    const decrease = () => {
        dispatch(cartActions.remove(props.id));
    };

    const remove = () => {
        dispatch(cartActions.delete(props.id));
    };

    return (
            <div className={styles["item"]}>
                    <div
                        className={styles["image"]}
                        style={{ backgroundImage: `url(/food/food${props.id}.png)` }}>
                    </div>
                    <div className={styles["description"]}>
                        <span className={styles["title"]}>{props.name}</span>
                        <span className={styles["price"]}>{props.price}&nbsp;₽</span>
                    </div>
                    <div className={styles["actions"]}>
                        <button className={styles["minus"]} onClick={decrease}>
                            <img src="/minus-icon.svg" alt="Удилть из корзины" />
                        </button>
                        <span className={styles["number"]}>{props.count}</span>
                        <button className={styles["plus"]} onClick={increase}>
                            <img src="/plus-icon.svg" alt="Добавить в корзину" />
                        </button>
                        <button className={styles["remove"]} onClick={remove}>
                            <img src="/delete-icon.svg" alt="Удалить все" />
                        </button>
                    </div>
            </div>
    );
}

export default CartItem;