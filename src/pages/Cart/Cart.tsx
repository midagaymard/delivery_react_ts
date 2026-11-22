import Heading from "../../components/Heading/Heading.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../../store/store.ts";
import CartItem from "../../components/CartItem/CartItem.tsx";
import {useEffect, useState} from "react";
import type {Product} from "../../interfaces/product.interface.ts";
import axios from "axios";
import { PREFIX } from "../../hepers/API.ts";

export function Cart() {
    const [cartProducts, setCartProducts] = useState<Product[]>([]);
    const items = useSelector((s: RootState) => s.cart.items);

    const getItem = async (id: number) => {
        const { data } = await axios.get<Product>(`${PREFIX}/products/${id}`);
        return data;
    }

    const loadAllItems = async () => {
        const res = await Promise.all(items.map(i => getItem(i.id)));
        setCartProducts(res);
    }

    useEffect(() => {
        loadAllItems();
    }, [items]);

    return (
        <>
            <Heading>Корзина</Heading>
            {items.map((i, key) => {
                const product = cartProducts.find(p => p.id === i.id);
                if(!product) {
                    return;
                }
                return (
                    <CartItem key={key} count={i.count} {...product} />
                )
            })}
        </>
    )
}