import React from "react";
import { render, screen, fireEvent, getByLabelText} from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import ShoppingCart from './ShoppingCart';
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


//Mock plant data
const plants = [
    {
        name: "Peperomia Rosso",
        id: 143,
        scientificName: "Peperomia caperata rosso",
        difficulty: "easy",
        light: "direct",
        img:
            "https://cdn.shopify.com/s/files/1/2781/9558/products/PEPEROMIA_ROSSO-1_800x.png?v=1587156590",
        sizes: ["small"],
        watering: 2,
        description:
            "Rosalia is a stunner with glossy green leaves accompanied by bright red undersides. Her oval shaped leaves are deeply grooved, adding depth to her figure. Flower spikes will appear with bright light, adding even more character to this absolute beaut.",
        price: 21,
    },
    {
        name: "String of Dolphins",
        id: 125341,
        scientificName: "Senecio peregrinus",
        difficulty: "easy",
        light: "direct",
        img:
            "https://cdn.shopify.com/s/files/1/2781/9558/products/SUCCULENT_DOLPHINS-1_800x.png?v=1587613674",
        sizes: ["small"],
        watering: 2,
        description:
            "Flipper's trailing stems are full of glossy succulent leaves, reminiscent to a pod of breaching dolphins. Flipper hails from South Africa, so he thrives in warm environments with lots of sun. This dolphin doesn't need too much water to thrive, making him low maintenance and easy to love.",
        price: 15,
    },
    {
        name: "Snake Plant",
        id: 4893,
        scientificName: "Sansevieria zeylanica",
        difficulty: "easy",
        light: "direct",
        img:
            "https://cdn.shopify.com/s/files/1/2781/9558/products/6__SANSEVIERIA_ZEYLANICA-1_800x.png?v=1587146468",
        sizes: ["small", "medium"],
        watering: 2,
        description:
            "One of the most popular and hardy of houseplants, he's virtually indestructible and adaptable to almost any condition. Whether you throw full, direct sunlight at him or shove him in the low-light corner of your apartment, he'll grow. And to top it off, he'll go weeks without water if he must.",
        price: 18,
    }
]

test("displays plants in cart", () => {
    const { getByText } = render(<ShoppingCart cart={plants} />)
   
    //Get Plants Listings to confirm correct adds to cart
    const peperomiaPlant = getByText(/Peperomia/i);
    const dolphinsPlant = getByText(/String of Dolphins/i);
    const snakePlant = getByText(/Snake/i);
    const total = getByText(/total/i);

    screen.debug(total)

    //Assert the right text is on the DOM
    expect(peperomiaPlant).toHaveTextContent(/Peperomia/i);
    expect(dolphinsPlant).toHaveTextContent(/Dolphins/i);
    expect(snakePlant).toHaveTextContent(/Snake/i);

    //Check the total amount is correct
    expect(total).toHaveTextContent(/54/i);

})