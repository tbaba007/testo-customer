import { ChangeEvent, FormEvent, useState } from "react";
import { CustomerProps } from "../types";
import editCustomerstyles from "./EditCustomer.module.css";
import Button from "../../../ui/Button/Button";
import { validateEmail, validatePhone } from "../../../helper/Common";
import { toast } from "react-toastify";

const EditCustomer = (customerObj: CustomerProps) => {
  const [customer, setCustomer] = useState<CustomerProps>(customerObj);

  const onUpdate=(event:FormEvent)=>{
    event.preventDefault();
    const {first_name,last_name,email,phone}=customer;
    if(!first_name?.trim()){
      return toast.warn('Please enter a valid firstName')
    }
    if(!last_name?.trim()){
      return toast.warn('Please enter a valid lastName')
    }
    if(!email?.trim()){
      return toast.warn('Please enter a valid email')
    }
    if(email?.trim() && !validateEmail(email?.trim())){
      return toast.warn('Please enter a valid email')
    }
    if(!phone?.trim()){
      return toast.warn('Please enter a phone number')
    }
    if(phone?.trim() && !validatePhone(phone?.trim())){
      return toast.warn('Please enter a valid phone number')
    }
    
    customer.onUpdate?.(customer)
  }
  const onCancel=()=>{
    customer.onCancel?.();
  }

  const validateUserEmail = (email: string) => {
    if (!validateEmail(email)) {
      return toast.warning("Enter a valid email address");
    }
  };

  const validateUserPhone = (phone: string) => {
    if (!validatePhone(phone)) {
      return toast.warning("Enter a valid phone number");
    }
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCustomer(oldVal=>({
      ...oldVal,[event.target.name]:event.target.value
    }))
  };

  return (
    <form onSubmit={onUpdate}>
      <div className={editCustomerstyles.container}>
        <span>Edit customer record</span>
        <div className={editCustomerstyles.container__wrapper}>
          <div className={editCustomerstyles.container__fields}>
            <label>FirstName</label>
            <input
              type="text"
              name="first_name"
              value={customer.first_name}
              placeholder="Enter FirstName"
              required
              onChange={handleOnChange}
            />
          </div>
          <div className={editCustomerstyles.container__fields}>
            <label>LastName</label>
            <input
              type="text"
              name="last_name"
              value={customer.last_name}
              placeholder="Enter LastName"
              required
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className={editCustomerstyles.container__wrapper}>
          <div className={editCustomerstyles.container__fields}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={customer.email}
              placeholder="Enter Email"
              onBlur={(e) => validateUserEmail(e.currentTarget.value)}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className={editCustomerstyles.container__fields}>
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={customer.phone}
              placeholder="Enter Phone"
              maxLength={11}
              onBlur={(e) => validateUserPhone(e.currentTarget.value)}
              onChange={handleOnChange}
              required
            />
          </div>
        </div>

        <div className={editCustomerstyles.container__fields__footer}>
          <Button text="Cancel" backgroundColor="red" onClick={onCancel!!} />{" "}
          <Button text="Update" backgroundColor="green" />
        </div>
      </div>
    </form>
  );
};

export default EditCustomer;
