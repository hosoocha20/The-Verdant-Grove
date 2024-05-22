import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  order: string,
  date: string,
  status: string,
  total: string
) {
  return { order, date, status, total };
}

const rows = [
  createData("012345", "May 14, 2024", "Paid", "79"),
  createData("123642", "January 24, 2024", "Paid", "29"),
  createData("235632", "December 10, 2023", "Paid", "13"),
  createData("157323", "October 3, 2023", "Paid", "48"),
  createData("135242", "May 14, 2023", "Paid", "24"),
];

const Account = () => {
  const [orderHistory, setOrderHistory] = useState(true);
  return (
    <div className="account-container">
      <h1>My Account</h1>
      <hr></hr>
      <div className="account-flex-wrap">
        <div className="account-flex-wrap-l">
          <p>Orders</p>
          <p>My Profile</p>
          <p>Logout</p>
        </div>
        <div className="account-flex-wrap-r">
          <h2>Orders</h2>
          <hr></hr>
          <h3>Order History (0)</h3>
          <div className="account-order-history-container">
            {orderHistory ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Dessert (100g serving)</TableCell>
                      <TableCell align="right">Calories</TableCell>
                      <TableCell align="right">Fat&nbsp;(g)</TableCell>
                      <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                      <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow
                        key={row.order}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.order}
                        </TableCell>
                        <TableCell align="right">{row.date}</TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                        <TableCell align="right">{row.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <div className="account-order-history-none">
                <p className="account-order-history-none__icon"> i</p>
                <p>You have no order history.</p>
              </div>
            )}
          </div>

          <hr></hr>
        </div>
      </div>
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.order}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.order}
                </TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </div>
  );
};

export default Account;
