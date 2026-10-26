import { useState,useEffect } from 'react'
import React from 'react';
import axios from 'axios';


function LoanProducts() {
    const [array, setArray] = useState([]);

    const fetchData = async () => {
        const response = await axios.get("http://localhost:3000/api/loan/products");
        setArray(response.data.products);
    }  
    useEffect(() => {
        fetchData();
    },[])

  return (
    <>
          <ul className="grid grid-cols-2 md:grid-cols-2 gap-3">
          {
            array?.map((product,index) => (

             
                <li className="bg-red px-4 py-12 pl-16 rounded-lg flex flex-col text-white gap-2 border border-red-500 bg-red-700" key={index}>
                <p className="font-bold">{product.name}</p>
                <p>{product.description}</p>
                <p>Minimum Amount:R {product.minAmount}</p>
                <p>Maximum Amount:R {product.maxAmount}</p>
                <p>Minimum Term: {product.minTerm}</p>
                <p>Maximum Term: {product.maxTerm}</p>
                <ul>
                 {Object.entries(product.interestRateRange).map(([rate,index1]) => (
                    <li key={index1}>Rate: {rate} <strong>{index1}</strong></li>
                  ))
                }
                </ul>
              {/* <ul>
                { Inner map: Safe check + nested loop to render purpose array}
                {product.purposes && product.purposes.length > 0 ? (
                  product.purposes.map((purposes, index2) => (
                    <li key={index2}>{purposes}</li>
                  ))
                ) : (
                  <li>No purposes listed</li>
                )}
              </ul> */}



                </li>
                
            ))
          }
          </ul>

 </>
  );
}

export default LoanProducts
