import React from 'react'
import "./Schemes.scss"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from '../Dashhead';
import {connect} from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
function Schemes(props) {
    const [display,setDisplay]=React.useState(false)
    const [myScheme,setMyScheme]=React.useState([])
    const [allScheme,setAllScheme]=React.useState([])
    const [selectedId,setSelectedId]=React.useState(null)

    const getMyScheme = async() =>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/scheme/mine`,{headers:{token:props.user.user}})
        .then(res=>{
          console.log(res)
          let arr = res.data.result[0].schemes.map((item,index)=>({...item,id:index+1}))
          setMyScheme(arr)
        })
    }

    const getSchemeApproval = ()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/sApproval/scheme`,{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
        })
    }

    const getAllScheme = ()=>{
        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/scheme/all`,{headers:{token:props.user.user}})
        .then(res=>{
            console.log(res)
            let arr = res.data.result.map((item,index)=>({...item,id:index+1}))
            setAllScheme(arr)
        })
    }

    React.useEffect(()=>{
        getMyScheme()
        getSchemeApproval()
        getAllScheme()
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


            <h1>My Scheme's</h1>
            <div style={{ height: '40vh', width: '100%' }}>
                <DataGrid
                    rows={myScheme}
                    columns={columns2}
                    autoPageSize
                    checkboxSelection
                    onRowClick={(item,ev)=>props.history.push('/orderdetails',item.row)}
                />
            </div>

            <h1>Scheme's on Cleverpe</h1>
            <p>(Select Scheme to Submit For Approval)</p>
            <div style={{ height: '50vh', width: '100%' }}>
                <DataGrid
                    rows={allScheme}
                    columns={columns2}
                    
                    autoPageSize
                    onRowClick={(item,ev)=>{
                        console.log(item)
                        setSelectedId(item.row)
                    }}
                />
            </div>
            {selectedId&&
            <div className="my-3">
            <p><b>Selected Scheme is {selectedId.name}</b></p>
            <Button onClick={()=>{
                axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/sApproval/create`,{
                    "schemeId": selectedId._id,
                    "approvalType": "Scheme"
                },{headers:{token:props.user.user}})
                .then(res=>{
                    console.log(res)
                    setSelectedId(null)
                })
            }} variant='contained'>Submit Scheme For approval</Button>
            </div>
            }


             </div>
    </div>
    )
}
const columns2 = [
    { field: 'id', headerName: 'ID',width:20},
    //{ field: 'brand', headerName: 'Brand Name',valueGetter:(param)=>param.value.name,width:150},
    { field: 'name', headerName: 'Name',valueGetter:(param)=>param.row.name,width:150},
    { field: 'month', headerName: 'Month',valueGetter:(param)=>param.row.month,width:200},
    { field: 'downPayment', headerName: 'Downpayment',valueGetter:(param)=>param.row.downPayment,width:150},
    {field:"createdAt",headerName:"Created At",valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:120}


  ];
const mapStateToProps = ({EventUser})=>{
    return {
        user:EventUser
    }
}

export default connect(mapStateToProps)(Schemes)
