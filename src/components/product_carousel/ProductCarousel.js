import { Fragment } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { useGetTopProductsQuery } from "../../redux/slices/api/productsApiSlice";
import './ProductCarousel.scss';

const ProductCarousel = () => {

    const { data: products } = useGetTopProductsQuery();

    return (
        <Carousel className="main-slide"
        dynamicHeight>
            {products?.map((product) => (
                <Fragment key={product.name}>
                    <img src={product.image} alt={product.name} className="product-image" />
                    <p className="legend">{product.name}</p>
                </Fragment>
            ))}
        </Carousel>
    );
}

export default ProductCarousel;