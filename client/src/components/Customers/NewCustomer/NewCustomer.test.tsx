import { render,screen } from "@testing-library/react"
import NewCustomer from "../NewCustomer"

test('it should have all form elements',()=>{
    render(<NewCustomer/>);
    const firstNameElement=screen.getByText('FirstName');
    const lastNameElement=screen.getByText('LastName');
    const phoneElement=screen.getByText('Phone');
    const emailElement=screen.getByText('Email');
    const cancelElement=screen.getByText('Cancel');
    const AddElement=screen.getByText('Add');
   
    expect(firstNameElement).toBeInTheDocument()
    expect(lastNameElement).toBeInTheDocument()
    expect(phoneElement).toBeInTheDocument()
    expect(emailElement).toBeInTheDocument()
    expect(cancelElement).toBeInTheDocument()
    expect(AddElement).toBeInTheDocument()

})

