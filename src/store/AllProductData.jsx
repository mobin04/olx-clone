import React, {createContext, useState} from "react";

export const ProductDataContext = createContext();

export const AllProductData = ({children}) => {
  const [allProduct, setAllProduct] = useState(null);
  
  return (
    <ProductDataContext.Provider value={{allProduct, setAllProduct}}>
      {children}
    </ProductDataContext.Provider>
  )
}