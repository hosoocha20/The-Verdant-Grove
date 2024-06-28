import React from "react";
import { useLocation } from "react-router-dom";
import { IOrderDetail } from "../interfaces/IOrder";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const OrderView = () => {
  const location = useLocation();
  const { orderDetail }: { orderDetail: IOrderDetail } = location.state;
  return (
    <div className="orderView-container">
      <h2>Order Details</h2>
      <hr></hr>
      <div className="orderView-details">
        <p>Order #{orderDetail.orderNo.toUpperCase()}</p>
        <p>
          Placed on{" "}
          {new Date(orderDetail.date).toLocaleString("en-NZ", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <div className="orderView-table">
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderDetail.products.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    className="orderView-table-name"
                  >
                    <img
                      src={`${"/src/assets/" + row.imgSrc[0]}`}
                      alt={row.name}
                    />
                    <span>{row.name}</span>
                  </TableCell>
                  <TableCell align="center">{row.quantity}</TableCell>
                  <TableCell align="center">
                    ${Number(row.price).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="orderView-summary-container">
        <p>Order Summary</p>
        <div className="orderView-summary-body">
          <p>Subtotal</p>
          <p>${orderDetail.subtotal.toFixed(2)}</p>
          <p>Shipping</p>
          <p>${orderDetail.shipping.toFixed(2)}</p>
          <p>Total</p>
          <p>${orderDetail.total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
