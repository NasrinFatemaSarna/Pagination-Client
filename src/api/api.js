
import  axios from "axios";
import store from "../redux/store/store";
import { setProducts, setTotal } from "../redux/slices/ProductSlice";

export async function getAllProducts(pageNumber, perPage, searchKeyword) {
    try {
        const url = `http://localhost:8000/api/v1/product-search-pagination/${pageNumber}/${perPage}/${searchKeyword}`;
        

        const result = await axios.get(url);




      if(result.status === 200){

        if(result.data.status==="success"){
            if(result.data.data[0].data.length > 0){
                store.dispatch(setProducts(result.data.data[0].data));
                store.dispatch(setTotal(result.data.data[0].total));
      }
    
      else{
        store.dispatch(setProducts([]));
        store.dispatch(setTotal(0));
      }
    } else {
        console.log("Request failed"); 
    }
    }else {
            console.log("Request failed"); 
        }

    } catch (error) {
        console.log(error);
       
    }  
}


