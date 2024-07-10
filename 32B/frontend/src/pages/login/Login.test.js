
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Login from './Login'
import { toast } from "react-toastify";
import { loginUserApi } from "../../apis/Api";

// Mock the API.JS file, Not Sending to real backend
jest.mock('../../apis/Api');

// List of test cases
describe('Login Component', () => {
    
    // Clearing all mock test
    afterEach(() => {
        jest.clearAllMocks()
    })

    // Test 1
    it('Should display error toast message on login fail! with incorrect password', async ()=>{

        // rendering login page/components
        render(<Login/>)

        // First, we have to make mock response
        const mockResponse = {
            data : {
                'success' : false,
                'message' : 'Incorrect Password!'
            }
        }

        // Config mock response
        loginUserApi.mockResolvedValue(mockResponse)

        // Config toast.error
        toast.error = jest.fn();

        // Finding Email, Password, And Login button from screen
        const email = await screen.findByPlaceholderText('Enter your email address')
        const password = await screen.findByPlaceholderText('Enter your password')
        const loginBtn = screen.getByText('Login')

        // Simulating, Filling input logically
        fireEvent.change(email, {target: {value: 'test@gmail.com'}})
        fireEvent.change(password, {target: {value: 'test123'}})
        fireEvent.click(loginBtn)
        
+        // we have finished the process above

        // Next is, Ensuring all above test are working fine!
        await waitFor(() => {
            // Expect api call with data, we entered/change
            expect(loginUserApi).toHaveBeenCalledWith({email: 'test@gmail.com', password:'test123'})

            // Check error.toast is called or not
            expect(toast.error).toHaveBeenCalledWith('Incorrect Password!')
        })

    })


})
