import * as React from 'react';
import { Box, Button, TextField } from '@mui/material';
import {useState, useEffect} from 'react'
import axios from 'axios'
import './MainContainer.css'
import ActionAlerts from './Alert'
import SucceedAlerts from './Succeed'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

function MainContainer ({currentHospital,everyHospital,currentUser,setCurrentUser}){

    const [amount, setAmount] = useState(0)
    const [orders, setOrders] = useState([])
    const [isloading, setIsloading] = useState(true)
    const [ordersNumber, setOrdersNumber] = useState(0)
    const [errorTextIsShown, setErrorTextIsShown] = useState(false)
    const [succeedTextIsShown, setsuSceedTextIsShown] = useState(false)
    const [maskLeft, setMaskLeft] = useState(0)
    


    const getOrders = async () => {
        const allOrders = await axios.get(`http://localhost:3000/order/all/${currentHospital.id}`, 
        )
        setOrders(allOrders.data)
        setIsloading(false)
    }
    const getUrls = async (id) => {
        const allUrls = await axios.get(`http://localhost:3000/order/url/${id}`)
        window.open(allUrls.data.public_url, "_blank")
        return allUrls.data.public_url
    }
    

    useEffect(() => {
        getOrders()
      }, [currentHospital, ordersNumber])
   

     

    const postOrder = async () => {
        const orderData = {
            id: currentHospital.id,
            amount: amount,
            address: currentHospital.address.country_code
        }
        try{
            setErrorTextIsShown(false)
            const postData = await axios.post('http://localhost:3000/order', orderData)
            setsuSceedTextIsShown(true)
            setTimeout ( () => {
                setsuSceedTextIsShown(false)
            }, 3000 )
        } catch (error){
            setErrorTextIsShown(true)
            setMaskLeft(error.response.data[0].amount)
        }
        // if (postData.status===201) setAmount(0)
        // console.log(postData)
        setOrdersNumber((prevState) => prevState+1)
    }


    const handleClick = () =>{
        postOrder()
        setAmount(0)
    }

    const inputProps = {
        step: 100,
      }

    return(
        <Box
        sx={{
            display: "flex",
            gap: 5,
            flexWrap: 'wrap'
        }}
        >
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: 'wrap',
                flex: '1 1 auto' ,
                gap: 2,
                minWidth: 300,

            }}
        >
            <Box
                sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: 'space-between',
                bgcolor: '#e8eaf6',
                boxShadow: 1,
                borderRadius: 2,
                p: 2,
                minHeight: 300,
            }}
            >
            <h1>Új rendelés</h1>
            <div className="main-container__orderform-element">
                <span>FFP2/KN95 maszk</span>
                <TextField
                id="outlined-number"
                label="Mennyiség"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={inputProps}
                value = {amount}
                onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            { errorTextIsShown && 
            <ActionAlerts maskLeft={maskLeft}/>
            }
            { succeedTextIsShown && 
            <SucceedAlerts/>
            }

            <Button 
            variant="contained"
            sx= {{backgroundColor:"#7986cb"}}
            onClick={handleClick}

            >Rendelés leadása</Button>

            </Box>

            <Box
            sx={{
                lineHeight: 2,
                bgcolor: '#e8eaf6',
                boxShadow: 1,
                borderRadius: 2,
                p: 2,
                minHeight: 300,
            }}
            >
            <h1>Intézmény adatai</h1>
            <p><b>Város: </b>{currentHospital.address.city}</p>
            <p><b>Cím: </b>{currentHospital.address.address}</p>
            <p><b>Email: </b>{currentHospital.emails[0]}</p>
            <p><b>Telefonszám: </b>{currentHospital.phone}</p>
            </Box>

        </Box>
            <Box
            sx={{
                display: "flex",
                gap: "2em",
                flexDirection: "column",
                flex: '3 1 auto' ,
                bgcolor: '#e8eaf6',
                boxShadow: 1,
                borderRadius: 2,
                p: 2,
                overflow: "scroll",
                overflowX: "hidden",
                maxHeight: "615px"
               
            }}
            
            >
            <h1>Korábbi megrendelések</h1>
            

            { !isloading && orders.data.map((order)=> {
                

                return (          
                <Box key={order.id} 
                sx={{
                    display:"flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    borderBottom: "1px solid black",
                }}
                > 
             
                    <h3
                    style={{
                        width: "150px"
                    }}
                    >{order.gross_total.toLocaleString()} HUF</h3> 
                    <p
                    >{order.fulfillment_date}</p> 
                    <p
                    style={{
                        width: "80px",
                        textAlign: "end"
                    }}
                    >{order.items[0].quantity} db</p>   

                    <Button
                    onClick={() => getUrls(order.id)}
                    >
                    <PictureAsPdfIcon/>
                    </Button>            
                </Box>               
                )                  
            })}

             </Box>
        </Box>
    )
}
export default MainContainer