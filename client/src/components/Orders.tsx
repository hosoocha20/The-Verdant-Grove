import React, { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { IOrderDetail } from "../interfaces/IOrder";



const Orders = () => {
    const { email} : {email: string} = useOutletContext();
    const [orderHistory, setOrderHistory] = useState<IOrderDetail[]>([]);

    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [page, setPage] = useState(0);
  
    const handleChange = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      value: number
    ) => {
      setPage(value);
    };

    const getUserOrders = async () =>{
      let response;
      try{
        response = await axios.get(`${import.meta.env.VITE_SERVERURL}/account/orders/${email}`);
        const json = await response.data;
        json.sort((a: IOrderDetail, b: IOrderDetail) => {
          return  new Date(b.date).getTime() -new Date(a.date).getTime();
        })
        setOrderHistory(json);
      }catch(err){
        console.log(err)
      }
    }

    useEffect(() =>{
      getUserOrders();
    },[])
  return (
    <div className="account-orders-container">
      <h2>Orders</h2>
      <hr></hr>
      <h3>Order History</h3>
      <div className="account-order-history-container">
        {orderHistory.length !== 0 ? (
          <div className="account-order-history-exists">
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Order</TableCell>
                    <TableCell align="left">Date</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderHistory
                    .slice(
                      page * itemsPerPage,
                      page * itemsPerPage + itemsPerPage
                    )
                    .map((row) => (
                      <TableRow
                        key={row.orderNo}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                        >
                          <Link to={`/account/orders/${row.orderNo}`} state={{orderDetail: row}} className="account-order-history-order-no">#{row.orderNo.toUpperCase()}</Link>
                        </TableCell>
                        <TableCell align="left">{new Date(row.date).toLocaleString('en-NZ', {month: 'long', day: 'numeric', year: 'numeric'})}</TableCell>
                        <TableCell align="left">{row.payment.charAt(0).toUpperCase() + row.payment.slice(1)}</TableCell>
                        <TableCell align="left">${Number(row.total).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>

              <TablePagination
                count={orderHistory.length}
                page={page}
                rowsPerPage={itemsPerPage}
                rowsPerPageOptions={[-1]}
                onPageChange={handleChange}
                style={{ padding: "1rem", display: "flex", border: "none" }}
              />
            </TableContainer>
          </div>
        ) : (
          <div className="account-order-history-none">
            <p className="account-order-history-none__icon"> i</p>
            <p>You have no order history.</p>
          </div>
        )}
      </div>

      <hr></hr>
    </div>
  );
};

export default Orders;
