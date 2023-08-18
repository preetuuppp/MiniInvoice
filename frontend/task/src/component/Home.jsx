import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { CgNotes } from "react-icons/cg";
import { ImAttachment } from "react-icons/im";
import {
  HiOutlineTruck,
  HiOutlineFolder,
  HiPencil,
  HiCurrencyDollar,
} from "react-icons/hi";

const InvoiceForm = () => {
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8080/cart")
      .then((response) => {
        setItems([...response.data]);

        updateTotalAmount();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const getItems = () => {
    items.forEach((el) => {
      console.log(el);
    });
  };

  useEffect(() => {
    updateTotalAmount();
  }, [items]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    const itemToUpdate = updatedItems[index];

    if (field === "quantity" || field === "rate") {
      itemToUpdate[field] = value;
      itemToUpdate.amount = itemToUpdate.quantity * itemToUpdate.rate;

      axios
        .patch(`http://localhost:8080/cart/update/${itemToUpdate._id}`, {
          [field]: value,
          amount: itemToUpdate.amount,
        })
        .then((response) => {
          console.log("Item updated successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error updating item:", error);
        });
    } else if (field === "nitem") {
      itemToUpdate.nitem = value;

      axios
        .patch(`http://localhost:8080/cart/update/${itemToUpdate._id}`, {
          nitem: value,
        })
        .then((response) => {
          console.log("Item name updated successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error updating item name:", error);
        });
    }

    setItems(updatedItems);
    updateTotalAmount();
  };

  const addNewItem = () => {
    const newItem = { nitem: "", quantity: 0, rate: 0 };
    axios
      .post("http://localhost:8080/cart/add", newItem)
      .then((response) => {
        setItems([...items, response.data]);
      })
      .catch((error) => {
        console.error("Error creating item:", error);
      });
  };

  const handleDeleteItem = (index, itemId) => {
    axios
      .delete(`http://localhost:8080/cart/delete/${itemId}`)
      .then((response) => {
        console.log("Item deleted successfully:", response.data);
        const updatedItems = items.filter((item, idx) => idx !== index);
        setItems(updatedItems);
        updateTotalAmount();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const updateTotalAmount = () => {
    const newTotalAmount = items.reduce(
      (total, item) => total + (item.amount || 0),
      0
    );
    console.log(newTotalAmount);
    setTotalAmount(newTotalAmount);
  };

  return (
    <div className="invoice-form">
      <h1>Invoice Form</h1>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={item.nitem}
                  onChange={(e) =>
                    handleItemChange(index, "nitem", e.target.value)
                  }
                  className="input-line"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "quantity",
                      parseFloat(e.target.value)
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.rate}
                  onChange={(e) =>
                    handleItemChange(index, "rate", parseFloat(e.target.value))
                  }
                />
              </td>
              <td>{item.amount || 0}</td>
              <td>
                <button onClick={() => handleDeleteItem(index, item._id)}>
                  <RxCross1 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addNewItem} className="add-button">
        <AiOutlinePlusSquare /> Add New Line
      </button>
      <div className="total">
        <p>
          <HiOutlineTruck /> Add Discount/Additional Changes
        </p>
        <p>
          <HiOutlineFolder /> Summarise Total Quantity
        </p>

        <div className="total-amount">Total (INR): {totalAmount}</div>

        <p>
          <HiCurrencyDollar />
          Show Total In Words
        </p>
        <p>
          {" "}
          <AiOutlinePlusSquare /> Add More Fields
        </p>
      </div>
      <div className="bottomSection">
        <div className="bottomSec">
          <div>
            <AiOutlinePlusSquare />
            Add terms & Conditions
          </div>
          <div>
            <CgNotes />
            Add Notes
          </div>
          <div>
            <ImAttachment />
            Add Attachment
          </div>
        </div>
        <div className="bottomlast">
          <HiPencil />
          Add Signature
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
