import React from "react";
import { render, screen } from "@testing-library/react";
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

test("form shows success message on submit with form details", () => {});
