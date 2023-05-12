import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch/useFetch";
import customerListStyles from "./Customer.module.css";
import Button from "../../shared/Button";
import { CustomerProps } from "./types";
import Modal from "../../shared/Modal/Modal";
import EditCustomer from "./EditCustomer/EditCustomer";
import NewCustomer from "./NewCustomer/NewCustomer";
import { toast } from "react-toastify";
import Pagination from "../../shared/Pagination";

const CustomerList = () => {
  document.title = "Customer List";
  const [customerData, setCustomerData] = useState<CustomerProps | null>();
  const [isAdd, setIsAdd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [customerList, setCustomerList] = useState<CustomerProps[]>();
  const [searchParameter,setSearchParameter]=useState('')
  const {
    isLoading,
    data,
    error,
    statusCode,
    postData,
    fetchData,
    updateData,
    deleteData,
  } = useFetch({
    urlPath: "customers",
  });
  const dataPerPage = Math.ceil(data?.length!! / 10);
  let pageNumbersArr: number[] = [];


  useEffect(() => {
    fetchData();
    showCustomersOnLoad();
    loadPageNumbers();
  }, [statusCode, fetchData]);

  const showCustomersOnLoad = () => {
    if (!isLoading && !error && data?.length!! > 0) {
      const customerList = [...data!!];
      const showList = customerList.slice(0, 10 * currentPage);
      setCustomerList(showList);
    }
  };

  const loadPageNumbers = () => {
    if (pageNumbersArr.length < 1) {
      let i = 0;
      while (i < dataPerPage) {
        i++;
        pageNumbersArr.push(i);
      }
      setPageNumbers(pageNumbersArr);
    }
  };

  const onEdit = (customer: CustomerProps) => {
    setCustomerData(customer);
  };

  const onDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteData(id, { method: "DELETE" });
      if (!isLoading && !error && statusCode > -1) {
        toast.success("Customer Deleted Successfully");
        fetchData();
      } else {
        toast.error("An error occured while deleting the customer");
      }
    }
  };

  const onUpdate = async (customer: Partial<CustomerProps>) => {
    updateData(customer, customer.id!!, { method: "PATCH" });
    if (!isLoading && !error && statusCode > -1) {
      toast.success("Customer Updated Successfully");
      fetchData();
    } else {
      toast.error("An error occured while updating the customer");
    }
    setCustomerData(null);
  };

  const onAdd = () => {
    setIsAdd(true);
  };

  const onSave = async (customer: Partial<CustomerProps>) => {
    postData(customer, { method: "POST" });
    if (!isLoading && !error) {
      toast.success("Customer Added Successfully");
      fetchData();
    } else {
      toast.error("An error occured while adding the customer");
    }
    setIsAdd(false);
  };

  const onPageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setCustomerList([]);
    const customerList = [...data!!];
    const customersToShow = customerList.slice(
      pageNumber * 10 - 10,
      10 * pageNumber
    );
    setCustomerList(customersToShow);
  };

  const onSearch = (event?:FormEvent) => {
    event?.preventDefault()
    if(!searchParameter){
      return toast.warn('Please enter a valid search parameter')
    }
      const customerData: CustomerProps[] = [...data!!];
      const filterCustomer = customerData?.filter(
        (x) =>
          x.email.includes(searchParameter) ||
          x.first_name.includes(searchParameter) ||
          x.last_name.includes(searchParameter) ||
          x.phone.includes(searchParameter)
      );

      if(filterCustomer.length>0){
        setCustomerList(filterCustomer);
        return;
      }
      toast.info('Search returned nothing')
    }


  if (isLoading) {
    return <label>Loading....</label>;
  }

  return (
    <>
      <div className={customerListStyles.customerContainer}>
        <div className={customerListStyles.customerContainer__Add}>
          <Button backgroundColor="green" text="Add Customer" onClick={onAdd} />
        </div>
        <div className={customerListStyles.customerContainer__Search}>
          <input
            type="search"
            placeholder="Enter Customer Name"
            id="inputsearch"
            onChange={(e)=>setSearchParameter(e.target.value)}
          /> &nbsp;
           <Button backgroundColor="green" text="Search" onClick={onSearch} />
        </div>

        <table cellSpacing="0" className={customerListStyles.customerTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              !error &&
              data &&
              customerList
                ?.sort(function (a: CustomerProps, b: CustomerProps) {
                  return b.id!! - a.id!!;
                })
                .map((customer: CustomerProps, index: number) => {
                  return (
                    <tr key={customer.id}>
                      <td>{index + 1}</td>
                      <td>{customer.first_name}</td>
                      <td>{customer.last_name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.phone}</td>
                      <td>
                        <Button
                          backgroundColor="green"
                          text="Edit"
                          onClick={() => onEdit(customer)}
                        />
                        &nbsp;
                        <Button
                          backgroundColor="red"
                          text="Delete"
                          onClick={() => onDelete(customer.id!!)}
                        />
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>

        
        {customerData && (
          <Modal>
            <EditCustomer
              {...customerData}
              onCancel={() => setCustomerData(null)}
              onUpdate={onUpdate}
            />
          </Modal>
        )}

        {isAdd && (
          <Modal>
            <NewCustomer onAdd={onSave} onCancel={() => setIsAdd(false)} />
          </Modal>
        )}
      </div>

      <Pagination
        arr={pageNumbers}
        totalCount={data?.length!!}
        currentArr={data!!}
        currentPage={currentPage}
        onClick={onPageClick}
      />
    </>
  );
};

export default CustomerList;
