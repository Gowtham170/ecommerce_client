import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { useGetTopProductsQuery } from "../../redux/slices/api/productsApiSlice";
import './ProductCarousel.scss';

const ProductCarousel = () => {

    const { data: products, isLoading, error } = useGetTopProductsQuery();

    return (

        <Carousel className="main-slide">
            {products?.map((product) => (
                <div>
                  <img src={product.image} className="product-image"/>
                  <p className="legend">{product.name}</p>
                </div>
            ))}
            {/* <div>
                <img src="assets/1.jpeg" />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src="assets/2.jpeg" />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src="assets/3.jpeg" />
                <p className="legend">Legend 3</p>
            </div> */}
        </Carousel>
    );
}

export default ProductCarousel;