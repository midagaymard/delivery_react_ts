import {Await, useLoaderData, useNavigate} from "react-router-dom";
import type { Product } from "../../interfaces/product.interface.ts";
import {Suspense} from "react";
import Heading from "../../components/Heading/Heading.tsx";
import styles from "./Product.module.css";
import Button from "../../components/Button/Button.tsx";
import {useDispatch} from "react-redux";
import {cartActions} from "../../store/cart.slice.ts";

export function Product() {
    const data = useLoaderData() as { data: Product };
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <>

            <Suspense fallback={"Загрузка..."}>
                <Await
                    resolve={data.data}
                >
                    {(product: Product) => (
                        <div className={styles["product"]}>
                            <div className={styles["top"]}>
                                <div className={styles["navigation"]}>
                                    <button className={styles["prev-button"]} onClick={() => navigate("/")}>
                                        <img src="/arrow-left.svg" alt=""/>
                                    </button>
                                    <Heading>{product.name}</Heading>
                                </div>
                                <Button className={styles["cart"]} onClick={() => dispatch(cartActions.add(product.id))}>
                                    <img src="/cart-icon-white.svg" alt=""/>
                                    В корзину
                                </Button>
                            </div>
                                <div className={styles["info"]}>
                                    <div className={styles["image"]} style={{ backgroundImage: `url(/food/food${product.id}.png)`}}></div>
                                    <div className={styles["description"]}>
                                        <div className={styles["info-content"]}>
                                            <h4>Цена</h4>
                                            <span>{product.price}</span>
                                        </div>
                                        <hr className={styles["hr"]}/>
                                        <div className={styles["info-content"]}>
                                            <h4>Рейтинг</h4>
                                            <div className={styles["rating"]}>
                                                {product.rating}&nbsp;
                                                <img src="/star-icon.svg" alt="" />
                                            </div>
                                        </div>
                                        <div className={styles["structure"]}>
                                            <span>Состав:</span>
                                            <ul>
                                                {product.ingredients.map((p) => {
                                                    if (!p) return;
                                                    const refuctor = p[0].toLocaleUpperCase() + p.slice(1).toLocaleLowerCase();
                                                    return <li key={product.id}>{refuctor}</li>;
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                        </div>
                    )}
                </Await>
            </Suspense>
        </>
    )
}