import { toast } from "react-toastify";
import { validateEmail, validatePhone } from "../../../helper/Common";
import Button from "../../../ui/Button";
import { CustomerProps } from "../types";
import addCustomerStyles from "./NewCustomer.module.css";
import { ChangeEvent, FormEvent, useState } from "react";

const NewCustomer = ({ onCancel, onAdd }: Partial<CustomerProps>) => {
  const [state, setState] = useState<CustomerProps>({
    email:'',
    first_name:'',
    last_name:'',
    phone:''
  });

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
    setState(oldVal=>({
      ...oldVal,[event.target.name]:event.target.value
    }))
  };


  const onAddCustomer = (event:FormEvent) => {
    event.preventDefault();
    const {first_name,last_name,email,phone}=state;
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
    
    onAdd?.(state!!);
  };

  return (
    <form onSubmit={onAddCustomer}>
      <div className={addCustomerStyles.container}>
        <span>Add new customer record</span>
        <div className={addCustomerStyles.container__wrapper}>
          <div className={addCustomerStyles.container__fields}>
            <label>FirstName</label>
            <input
              type="text"
              name="first_name"
              placeholder="Enter FirstName"
              required
              onChange={handleOnChange}
            />
          </div>
          <div className={addCustomerStyles.container__fields}>
            <label>LastName</label>
            <input
              type="text"
              name="last_name"
              placeholder="Enter LastName"
              required
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className={addCustomerStyles.container__wrapper}>
          <div className={addCustomerStyles.container__fields}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              onBlur={(e) => validateUserEmail(e.currentTarget.value)}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className={addCustomerStyles.container__fields}>
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter Phone"
              maxLength={11}
              onBlur={(e) => validateUserPhone(e.currentTarget.value)}
              onChange={handleOnChange}
              required
            />
          </div>
        </div>

        <div className={addCustomerStyles.container__fields__footer}>
          <Button text="Cancel" backgroundColor="red" onClick={onCancel!!} />{" "}
          <Button text="Add" backgroundColor="green" />
        </div>
      </div>
    </form>
  );
};

export default NewCustomer;
