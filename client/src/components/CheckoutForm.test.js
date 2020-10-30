import React from "react";
import { render, screen, fireEvent} from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import { renderIntoDocument } from "react-dom/test-utils";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    //Render component to virtual DOM
    render(<CheckoutForm />);

    //Grab the form header and print out a debug
    const formHeader = screen.getByText(/Checkout Form/i);
    screen.debug(formHeader);

    //Assert that the title is indeed Checkout Form
    expect(formHeader).toHaveTextContent(/Checkout Form/i);
});

test("form shows success message on submit with form details", () => {
    //Render component to virtual DOM
    render(<CheckoutForm />);

    //Grab the form fields and button
    const fNameInput = screen.getByLabelText(/First/i);
    const lNameInput = screen.getByLabelText(/Last/i);
    const address = screen.getByLabelText(/Address/i);
    const city = screen.getByLabelText(/City/i);
    const state = screen.getByLabelText(/State/i);
    const zip = screen.getByLabelText(/Zip/i);
    const button = screen.getByRole('button');

    //Type into fields
    fireEvent.change(fNameInput, { target: { value: 'Brendan' }});
    fireEvent.change(lNameInput, { target: { value: 'Lai-Tong' }});
    fireEvent.change(address, { target: { value: '123 Street St.' }});
    fireEvent.change(city, { target: { value: 'City' }});
    fireEvent.change(state, { target: { value: 'Stateland' }});
    fireEvent.change(zip, { target: { value: '12345' }});
   
    //Push button
    fireEvent.click(button);


    //Ensure that success message displayed using test ID
    expect(screen.getByTestId('successMessage'));

    //Printout area for human review
    screen.debug(screen.getByTestId('successMessage'))
});
