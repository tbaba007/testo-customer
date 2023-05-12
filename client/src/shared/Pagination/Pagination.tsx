import React from "react";
import "./Pagination.css";
import {PaginationProps
} from './type'
const Pagination = ({ arr, onClick, currentPage, totalCount, currentArr }:PaginationProps) => {

   return (
      <div className="Pagination">
         <section className="Pagination__PageShowing">
            Showing {currentPage * 10 - 10 + 1} to{" "}
            {currentPage * 10 - 10 + currentArr?.length} of {totalCount} entries
         </section>
         <section
            className={
               currentPage === 1
                  ? "Pagination__Back--Disabled"
                  : "Pagination__Back"
            }
         
            onClick={(currentPage > 1 ? () => onClick(currentPage - 1) : null)!!}
         >
            Previous
         </section>

         {arr.map((item) => {
            return (
               <div key={item}>
                  <section
                     className={
                        currentPage === item
                           ? "Pagination__Pagebuttons--active Pagination__Pagebuttons"
                           : "Pagination__Pagebuttons"
                     }
                     onClick={() => onClick(item)}
                  >
                     {item}
                  </section>
               </div>
            );
         })}

         <section
            className={
               currentPage === arr[arr?.length - 1]
                  ? "Pagination__Back--Disabled"
                  : "Pagination__Next"
            }
            onClick={
               (currentPage !== arr[arr?.length - 1]
                  ? () => onClick(currentPage + 1)
                  : null)!!
            }
         >
            Next
         </section>
      </div>
   );
};

export default Pagination;
