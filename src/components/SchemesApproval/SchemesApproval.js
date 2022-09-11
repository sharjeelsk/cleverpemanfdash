import React from 'react'
import "./SchemesApproval.scss"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from '../Dashhead';
import {connect} from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
function SchemesApproval(props) {
    const [display,setDisplay]=React.useState(false)
    const [data,setData] = React.useState([])

    React.useEffect(()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/sApproval/userScheme`,{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            let arr = res.data.result.map((item,index)=>({...item,id:index+1}))
            setData(arr)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])

    return (
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
            <Dashhead id={4} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container" onClick={()=>display&&setDisplay(false)}>
            <span className="iconbutton display-mobile">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>


            <h1>Scheme's Sent for Approval</h1>
            <div style={{ height: '40vh', width: '98%' }}>
                <DataGrid
                    rows={data}
                    columns={columns2}
                    autoPageSize
                    onRowClick={(item,ev)=>props.history.push('/orderdetails',item.row)}
                />
            </div>

             </div>
    </div>
    )
}
const columns2 = [
    { field: 'id', headerName: 'ID',width:20},
    //{ field: 'brand', headerName: 'Brand Name',valueGetter:(param)=>param.value.name,width:150},
    { field: 'name', headerName: 'Name',valueGetter:(param)=>param.row.schemeDetails.name,width:150},
    { field: 'month', headerName: 'Month',valueGetter:(param)=>param.row.schemeDetails.month,width:200},
    { field: 'downPayment', headerName: 'Downpayment',valueGetter:(param)=>param.row.schemeDetails.downPayment,width:150},
    { field: 'status', headerName: 'Status',valueGetter:(param)=>param.row.status,width:150},
    {field:"createdAt",headerName:"Created At",valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:120}


  ];
const mapStateToProps = ({EventUser})=>{
    return {
        user:EventUser
    }
}

export default connect(mapStateToProps)(SchemesApproval)
