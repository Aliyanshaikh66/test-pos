import React, {useState, useEffect, useRef} from 'react';
import { useReactToPrint } from "react-to-print";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import '../Invoice.css';
import { Typography } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function InvoiceModal({ _id }) {

    const [open, setOpen] = React.useState(false);
    const [bill, setBill] = useState([]);

    const billRef = useRef(); 

    const handleOpen = () => {
        setOpen(true);
        axios.get('/api/bills/get-bills')
        .then(json => {setBill(json.data.filter(bill => bill._id === _id))})
        .catch(err => alert(err.message))
    }
    const handleClose = () => setOpen(false);

    const handlePrint = useReactToPrint({
        content: () => billRef.current,
      });

    

    return (
        <div>
            <Button variant="contained" onClick={handleOpen} style={{backgroundColor:'black',color:'white'}}> <VisibilityIcon />
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style} style={{backgroundColor:'white'}}>
                    {
                        bill.length === 1 ?
                        <>
                        <div id="invoice-POS" ref={billRef}>
                        <center id="top">
                          <div className="logo" />
                          <div className="info">
                            <h2>POS</h2>
                            <p> Contact : 123456 | Karachi Pakistan</p>
                          </div>
                          
                        </center>
                        
                        <div id="mid">
                          <div className="mt-2">
                            <p>
                              Customer Name : <b>{bill[0].customerName}</b>
                              <br />
                              Phone No : <b>{bill[0].customerNumber}</b>
                              <br />
                              Date : <b>{bill[0].date.toString().substring(0, 10)}</b>
                              <br />
                            </p>
                            <hr style={{ margin: "5px" }} />
                          </div>
                        </div>
                        
                        <div id="bot">
                          <div id="table">
                            <table>
                              <tbody>
                                <tr className="tabletitle">
                                  <td className="item">
                                    <h2><b>Item</b>
                                       </h2>
                                  </td>
                                  <td className="Hours">
                                    <h2>Qty<b></b> </h2>
                                  </td>
                                  <td className="Rate">
                                    <h2><b> Price</b>
                                </h2>
                                  </td>
                                  <td className="Rate">
                                    <h2><b> Total</b>
                                      </h2>
                                  </td>
                                </tr>
                                {bill[0].cartItems.map((item) => (
                                  <>
                                    <tr className="service" key = {item.name}>
                                      <td className="tableitem">
                                        <p className="itemtext">{item.name}</p>
                                      </td>
                                      <td className="tableitem">
                                        <p className="itemtext">{item.quantity}</p>
                                      </td>
                                      <td className="tableitem">
                                        <p className="itemtext">{item.price}</p>
                                      </td>
                                      <td className="tableitem">
                                        <p className="itemtext">
                                          {item.quantity * item.price}
                                        </p>
                                      </td>
                                    </tr>
                                  </>
                                ))}
            
                                <tr className="tabletitle">
                                  <td />
                                  <td />
                                  <td className="Rate">
                                    <h2> <b> tax</b></h2>
                                  </td>
                                  <td className="payment">
                                    <h2>${bill[0].tax}</h2>
                                  </td>
                                </tr>
                                <tr className="tabletitle">
                                  <td />
                                  <td />
                                  <td className="Rate">
                                    <h2><b> Grand Total</b>
                          
                                      </h2>
                                  </td>
                                  <td className="payment">
                                    <h2>
                                      <b>${bill[0].totalAmount}</b>
                                    </h2>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                          <div id="legalcopy">
                            <p className="legal">
                              <strong>Thank you for your order!</strong> 10% GST application
                              on total amount.Please note that this is non refundable amount
                              for any assistance please write email
                              <b> help@mydomain.com</b>
                            </p>
                          </div>
                        </div>
                        
                      </div>
                      
                      <div className="d-flex justify-content-end mt-3">
                        <Button variant="contained" onClick={handlePrint}>
                          Print
                        </Button>
                      </div>
                      </>

                        :
                        <div>Empty</div>
                    }
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}