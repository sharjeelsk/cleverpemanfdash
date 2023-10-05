import React from 'react'
import "./Products.scss"
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dashhead from '../Dashhead';
import {connect} from 'react-redux'
import axios from 'axios'
import { Rectangle } from 'recharts';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment'
import { TextField,Button } from '@mui/material';

function Products(props) {
    const [display,setDisplay]=React.useState(false)
    const [data,setData]=React.useState([])


    React.useEffect(()=>{

        axios.get(`${process.env.REACT_APP_DEVELOPMENT}/api/product/byBrand/${props.user.userInfo.oemId}`,{headers:{token:props.user.user}})
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
            <Dashhead id={2} display={display} />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 dashboard-container" onClick={()=>display&&setDisplay(false)}>
            <span className="iconbutton display-mobile">
            <IconButton  size="large" aria-label="Menu" onClick={()=>setDisplay(true)}>
            <MenuIcon fontSize="inherit" />
             </IconButton>
             </span>
            <h1>Products</h1>

            <div style={{ height: '80vh', width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns2}
                    autoPageSize
                    onRowClick={(item,ev)=>props.history.push('/productdetail',item.row)}
                />
            </div>
             </div>
    </div>
    )
}

const columns2 = [
    { field: 'id', headerName: 'ID',width:20},
    //{ field: 'brand', headerName: 'Brand Name',valueGetter:(param)=>param.value.name,width:150},
    { field: 'name', headerName: 'Product Name',valueGetter:(param)=>param.row.name,width:250},
    { field: 'variationMrp', headerName: 'Variation MRP',valueGetter:(param)=>param.row.variationMrp,width:200},
    // { field: 'variationPrice', headerName: 'Variation Price',valueGetter:(param)=>param.row.variationPrice,width:200},
    // { field: 'interestBased', headerName: 'Interest Based',valueGetter:(param)=>param.row.interestBased?"Yes":"No",width:200},
    // {field:"createdAt",headerName:"Created At",valueGetter:(param)=>moment.parseZone(param.value).local().format("DD/MM/YY"),width:120}


  ];


const mapStateToProps =({EventUser})=>{
    return {
      user:EventUser
    }
  }

export default connect(mapStateToProps)(Products)
