import ProductCard from "../../../components/ProductCard/ProductCard.tsx";
import type { MenuListProps } from "./MenuList.props.ts";
import styles from "./MenuList.module.css";

export function MenuList ({ products }: MenuListProps) {
    return (
        <div className={styles["wrapper"]}>
            {products.map((product) => (
            <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.ingredients.join(", ")}
                image={`/food/food${product.id}.png`}
                price={product.price}
                rating={product.rating}
            />
            ))}
        </div>
    )
}