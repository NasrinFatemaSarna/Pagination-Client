



import { useEffect, useState } from 'react';
import './App.css';
import { getAllProducts } from './api/api';
import { useSelector } from 'react-redux';
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

function App() {
  const [searchKeyword, setSearchKeyword] = useState("null");
  const [perPage, setPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllProducts(1, perPage,"null");
  }, []);

  const allProducts = useSelector((state) => state.product.products);
  const total = useSelector((state) => state.product.total);

// search value start
  const handleSearchValue = (e) => {
    setSearchKeyword(e.target.value);
    if (e.target.value.length === 0) {
      setSearchKeyword("null");
      getAllProducts(1, perPage, "null");
    }
  }

  const handleSearch = () => {
    getAllProducts(1, perPage, searchKeyword)
  }

  // search value end

  // handle perpage start
  const handlePerPage = (e) => {
    setPerPage(e.target.value);
    getAllProducts(1, e.target.value, searchKeyword)
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getAllProducts(pageNumber, perPage, searchKeyword)
  }

  return (
    <div>
    <div className="container mx-auto flex justify-between items-center mb-5 py-5 ">
      <div className="text-2xl font-bold text-green-600">LOGO</div>
  
      <div className="flex gap-5">
        <input onChange={handleSearchValue} type="text" placeholder="Search here"
          className="border-2 border-green-600 px-3 py-1 rounded-lg w-[400px] outline-none"/>
        <button  onClick={handleSearch} 
          className="bg-green-600 text-white px-3 py-1 rounded-lg focus:ring-2" > Search </button>
        <select
          className="border-2 border-green-600 px-3 py-1 rounded-lg outline-none"
          onChange={handlePerPage}>
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="15">15 per page</option>
          <option value="20">20 per page</option>
          {/* Add more options as needed */}
        </select>
      </div>
    </div>
  
    <div className="flex justify-between container mx-auto mt-8 flex-wrap gap-y-7">

    {
      allProducts.length > 0 ?
        allProducts.map((product,i) => {

          return (
            <div key={i} className="w-[30%] p-5 rounded-lg border-2 border-green-600">
              <h1 className="text-2xl font-bold text-green-600">{product.title}</h1>
          <h1 className="text-xl font-bold text-green-600">{product.category}</h1>
          <h1 className="text-xl font-bold text-green-600">${product.price}</h1>
          <p className="text-lg text-green-600">{product.shortDescription}</p>
        </div>
          )})
          : <h1 className="text-2xl font-bold text-green-600">No product found</h1>
        }
   
    </div>

   <div className='container mx-auto mt-5 '>

   <ResponsivePagination
      current={currentPage}
      total={Math.ceil(total[0]?.total/perPage)}
      onPageChange={handlePageChange} 
    />

   </div>
  </div>
  
  );
}

export default App;




