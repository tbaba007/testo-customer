import {render,screen} from '@testing-library/react'
import useFetch from "../hooks/useFetch/useFetch"
import App from "../../App";

const LOADING='Loading....'


test('it should have an add new customer button',()=>{
    render(<App />);
    const loadingText=screen.getByText(LOADING);
    expect(loadingText).toBeInTheDocument();
})



