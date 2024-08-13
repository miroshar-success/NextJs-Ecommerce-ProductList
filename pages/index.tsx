import { GetServerSideProps } from 'next';
import { useState } from 'react';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import { Product } from '../types/product';

interface ProductPageProps {
  products: Product[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://my-json-server.typicode.com/OskarMast/JSON-API/products');
  const products: Product[] = await res.json();

  return {
    props: {
      products,
    },
  };
};

const Home = ({ products }: ProductPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<'price' | 'rating'>('price');
  const [visibleProducts, setVisibleProducts] = useState(10);

  // Filter and sort products based on searchTerm and sortOption
  const filteredProducts = products
    .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (sortOption === 'price' ? a.price - b.price : b.rating - a.rating));

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + 10);
  };

  const productsToShow = filteredProducts.slice(0, visibleProducts);

  return (
    <div>
      <Header />
      <main className="container mx-auto pt-20 p-4">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="mb-4">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as 'price' | 'rating')}
            className="border p-2 rounded w-full"
          >
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
        <ProductList products={productsToShow} />
        {visibleProducts < filteredProducts.length && (
          <button onClick={loadMoreProducts} className="mt-4 p-2 bg-blue-500 text-white rounded">
            Load More
          </button>
        )}
      </main>
    </div>
  );
};

export default Home;
