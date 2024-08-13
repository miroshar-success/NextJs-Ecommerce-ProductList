import { Product } from '../types/product';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();

  return (
    <div className="border p-4 rounded flex flex-col">
      <img src={product.imageUrl} alt={product.name} className="h-40 w-full object-cover mb-4" />
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p>{product.description.substring(0, 100)}...</p>
      <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
      <p>{'★'.repeat(product.rating)}</p>
      <button
        onClick={() =>
          dispatch(addItem({ id: product.id, name: product.name, price: product.price }))
        }
        className="mt-auto p-2 bg-green-500 text-white rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
