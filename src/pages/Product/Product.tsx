import {Await, useLoaderData} from "react-router-dom";
import type { Product } from "../../interfaces/product.interface.ts";
import {Suspense} from "react";

export function Product() {
    const data = useLoaderData() as { data: Product };

    return (
        <>
            <Suspense fallback={"Загрузка..."}>
                <Await
                    resolve={data.data}
                >
                    {(product: Product) => (
                        <>Product - {product.name}</>
                    )}
                </Await>
            </Suspense>
        </>
    )
}