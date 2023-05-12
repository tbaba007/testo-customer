import { renderHook,waitFor,act } from "@testing-library/react";
import useFetch from "./useFetch";

describe('test customer endpoint',()=>{
    it('should return data after fetch',async()=>{
       global.fetch=jest.fn()
        const {result}=renderHook(()=>useFetch({urlPath:"customers"}));
         act(()=>async ()=>{
            await waitFor(() => {
               result.current.fetchData()

             })
             
             
        })
        console.log(result.current)
      
    })
   
})