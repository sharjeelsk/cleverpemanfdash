import React from 'react'
import "./CompletedOrders.scss"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from '../Dashhead';
import {connect} from 'react-redux'
import axios from 'axios'
import { Rectangle } from 'recharts';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment'
import { TextField,Button } from '@mui/material';

function CompletedOrders(props) {
    const [display,setDisplay]=React.useState(false)
    const [data,setData]=React.useState([])


    React.useEffect(()=>{

          axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/order/completed/oem/${props.user.userInfo.oemId}`,{headers:{token:props.user.user}})
          .then((response) => {
            console.log(response)
            setData(response.data.result.map((item,index)=>({...item,id:index+1})))
          })
          .catch((error) => {
            console.log(error);
          });
    },[])



    return (
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
            <Dashhead id={3} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container" onClick={()=>display&&setDisplay(false)}>
            <span className="iconbutton display-mobile">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>
            <h1>Completed Orders</h1>
            <div style={{ height: '80vh', width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns2}
                    autoPageSize
                />
            </div>

             </div>
    </div>
    )
}

const columns2 = [
    { field: 'id', headerName: 'ID',width:20},
    //{ field: 'brand', headerName: 'Brand Name',valueGetter:(param)=>param.value.name,width:150},
    { field: 'name', headerName: 'Product Name',valueGetter:(param)=>param.row.items[0].details.product[0].name,width:150},
    { field: 'orderId', headerName: 'CleverPe OrderId',valueGetter:(param)=>param.row.orderId,width:200},
    { field: 'modelNo', headerName: 'Model Id',valueGetter:(param)=>param.row.serialNo.modelId,width:150},
    { field: 'serialNo', headerName: 'Serial No',valueGetter:(param)=>param.row.serialNo.serialNo,width:150},
    { field: 'total', headerName: 'Total',valueGetter:(param)=>param.row.total,width:150},
    { field: 'Email', headerName: 'Merchant Email',valueGetter:(param)=>param.row.userDetails.email,width:150},
    { field: 'Name', headerName: 'Merchant Name',valueGetter:(param)=>param.row.userDetails.name,width:150},
    { field: 'Mobile No', headerName: 'Mobile Number',valueGetter:(param)=>param.row.userDetails.mobileNo,width:150},
    {field:"createdAt",headerName:"Created At",valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:120}


  ];

const mapStateToProps =({EventUser})=>{
    return {
      user:EventUser
    }
  }

export default connect(mapStateToProps)(CompletedOrders)
