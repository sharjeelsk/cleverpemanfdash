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

function ProductDetail(props) {
    console.log(props)
    const [display,setDisplay]=React.useState(false)
    const [data,setData]=React.useState([])
    let product = props.location.state

    React.useEffect(()=>{


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
            <h1>{product.name}</h1>
            <h4>Schemes</h4>
            {
                product.schemes.map((item,index)=>
                <div key={index} className="my-4">
                <span>Name: <b>{item.scheme}</b></span>
                <span className="ml-4">Subvention Cost: <b>{item.mbd}</b></span>
                </div>
                )
            }
            


             </div>
    </div>
    )
}



const mapStateToProps =({EventUser})=>{
    return {
      user:EventUser
    }
  }

export default connect(mapStateToProps)(ProductDetail)
