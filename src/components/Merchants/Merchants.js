import React from 'react'
import "./Merchants.scss"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from '../Dashhead';
import {connect} from 'react-redux'
import axios from 'axios'
import { Rectangle } from 'recharts';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment'
import { TextField,Button } from '@mui/material';

function Merchants(props) {
    const [display,setDisplay]=React.useState(false)
    const [data,setData]=React.useState([])
    const [search,setSearch]=React.useState("")
    const [singleMerchant,setSingleMerchant]=React.useState(null)
    const [merchantApprovals,setMerchantApprovals]=React.useState([])
    const [flag,setFlag]=React.useState(false)

    React.useEffect(()=>{
        console.log(props.user.userInfo.groupId)
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/user/mfrMerchant`,{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            let arr = res.data.result[0].merchants.map((item,index)=>({...item,id:index+1}))
            setData(arr)
            axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/sApproval/userMerchant`,{headers:{token:props.user.user}})
            .then(response=>{
                console.log(response)
                let arr2 = response.data.result.map((item,index)=>({...item,id:index+1}))
                setMerchantApprovals(arr2)
            })
        })
        .catch(err=>{
            console.log(err)
        })

    },[flag])

    const handleSearch = ()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/user/${search}`,{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            if(res.status===200){
                setSingleMerchant(res.data.result)
            }
        })
    }


    return (
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
            <Dashhead id={2} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container" onClick={()=>display&&setDisplay(false)}>
            <span className="iconbutton display-mobile">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>
             <h1>Search for Specific Merchant</h1>

            <div className="search-merchant-div row m-auto justify-content-around">

            <div className='col-6'>
            <TextField onChange={(e)=>setSearch(e.target.value)} className="my-3" fullWidth variant="filled" id="filled-basic" label="Enter Merchant ID" />
            <Button onClick={()=>handleSearch()}   className="my-3" fullWidth variant="outlined">Search</Button>
            </div>

            {singleMerchant&&<div className="col-4 merchant-info-single">
                <h3>{singleMerchant.name}</h3>
                <p>{singleMerchant.mobileNo}</p>
                <p>{singleMerchant.email}</p>
                <p>{singleMerchant.merchantId}</p>
                <Button onClick={()=>{
                    ///api/sApproval/createMfr
                    axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/sApproval/createMfr`,{
                        merchantId:singleMerchant._id,
                        approvalType:"Merchant"
                    },{headers:{token:props.user.user}})
                    .then(res=>{
                        console.log(res)
                        setSingleMerchant(null)
                        setFlag(!flag)
                    })
                }} variant="contained">Add to Organization</Button>
            </div>}
            </div>

            <h1>{props.user.userInfo.name} Merchant's</h1>
            <div style={{ height: '40vh', width: '98%' }}>
                <DataGrid
                    rows={data}
                    columns={columns2}
                    autoPageSize
                    checkboxSelection
                    onRowClick={(item,ev)=>props.history.push('/orderdetails',item.row)}
                />
            </div>

            <h1>Merchant Status</h1>
            <div style={{ height: '40vh', width: '98%' }}>
                <DataGrid
                    rows={merchantApprovals}
                    columns={columns3}
                    autoPageSize
                    checkboxSelection
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
    { field: 'name', headerName: 'Name',valueGetter:(param)=>param.row.name,width:150},
    { field: 'email', headerName: 'Email',valueGetter:(param)=>param.row.email,width:200},
    { field: 'groupId', headerName: 'GroupId',valueGetter:(param)=>param.row.groupId,width:150},
    { field: 'mobileNo', headerName: 'Mobile No',valueGetter:(param)=>param.row.mobileNo,width:150},
    { field: 'merchantId', headerName: 'Merchant Id',valueGetter:(param)=>param.row.merchantId,width:150},
    { field: 'verified', headerName: 'Verified',valueGetter:(param)=>param.row.verified.toString(),width:150},
    {field:"createdAt",headerName:"Created At",valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:120}


  ];

  const columns3 = [
    { field: 'id', headerName: 'ID',width:20},
    //{ field: 'brand', headerName: 'Brand Name',valueGetter:(param)=>param.value.name,width:150},
    { field: 'name', headerName: 'Name',valueGetter:(param)=>param.row.merchantDetails.name,width:150},
    { field: 'email', headerName: 'Email',valueGetter:(param)=>param.row.merchantDetails.email,width:200},
    
    { field: 'mobileNo', headerName: 'Mobile No',valueGetter:(param)=>param.row.merchantDetails.mobileNo,width:150},
    { field: 'merchantId', headerName: 'Merchant Id',valueGetter:(param)=>param.row.merchantDetails.merchantId,width:150},
    { field: 'status', headerName: 'Status',valueGetter:(param)=>param.row.status,width:150},
    {field:"createdAt",headerName:"Created At",valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:120}


  ];

const mapStateToProps =({EventUser})=>{
    return {
      user:EventUser
    }
  }

export default connect(mapStateToProps)(Merchants)
