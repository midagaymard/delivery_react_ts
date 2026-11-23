import Button from "../../components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
import styles from "./Success.module.css"

export function Success() {
    const navigate = useNavigate()

    return (
        <div className={styles["success"]}>
            <img src="/pizza.png" alt="Изображение пиццы"/>
            <h2 className={styles["text"]}>Ваш заказ успешно оформлен</h2>
            <Button appearance={"big"} onClick={() => navigate("/")}>Сделать новый</Button>
        </div>
    )
}