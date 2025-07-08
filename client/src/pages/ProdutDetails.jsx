import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard"; 

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();

  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const product = products.find((p) => p._id === id);

  useEffect(() => {
    if (product && product.images?.length) {
      setThumbnail(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    if (product && products.length) {
      const related = products
        .filter((p) => p.category === product.category )
        .slice(0, 5);
      setRelatedProducts(related);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="mt-12 text-center text-lg text-red-500">
        Product not found.
      </div>
    );
  }

  return (
    <div className="mt-12">
      <p className="mb-4 text-sm text-gray-600">
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> /{" "}
        <Link to={`/products/${product.category.toLowerCase()}`}>
          {product.category}
        </Link>{" "}
        / <span className="text-primary">{product.name}</span>
      </p>
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 mt-4">
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {product.images.map((img, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(img)}
                className="border max-w-24 border-gray-300 rounded overflow-hidden cursor-pointer"
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="border border-gray-300 rounded max-w-md overflow-hidden">
            <img src={thumbnail} alt="Selected product" />
          </div>
        </div>

        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-semibold">{product.name}</h1>

          <div className="flex items-center gap-1 mt-2">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                  className="w-4"
                />
              ))}
            <span className="ml-2 text-base text-gray-600">(4.5)</span>
          </div>

          <div className="mt-6">
            <p className="text-gray-500 line-through">
              MRP: {currency}
              {product.price}
            </p>
            <p className="text-2xl font-bold text-primary">
              {currency}
              {product.offerPrice}
            </p>
            <span className="text-gray-500">(inclusive of all taxes)</span>
          </div>

          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-600">
            {product.description.map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
          </ul>

          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 transition text-gray-800 rounded font-medium"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="w-full py-3.5 bg-primary hover:bg-primary-dull transition text-white rounded font-medium"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-20">
        <div className="text-center">
          <p className="text-3xl font-semibold">Related Products</p>
          <div className="w-20 h-1 bg-primary rounded-full mt-2 mx-auto"></div>
        </div>

        <div className="mt-6 w-full flex flex-col items-center">
          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center">
              {relatedProducts
                .filter((item) => item.inStock)
                .map((item, index) => (
                  <ProductCard key={index} product={item} />
                ))}
            </div>
          ) : (
            <p className="text-xl text-gray-600 mt-6">No Related Products</p>
          )}

          <button
            onClick={() => {
              navigate("/products");
              scrollTo(0, 0);
            }}
            className="mt-12 px-8 py-2.5 bg-primary text-white hover:bg-primary-dull transition rounded font-medium"
          >
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
