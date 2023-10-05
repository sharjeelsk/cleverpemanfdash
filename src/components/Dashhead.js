import React from 'react'
import "./Dashhead.scss"
import {withRouter} from 'react-router'
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {connect} from 'react-redux'
import {Button} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import {deleteUser} from './redux/user/userActions'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArticleIcon from '@mui/icons-material/Article';
const Dashhead = (props) => {
    console.log(props);
    let {id,display} = props
    return (
        
            
        <div className={display?"shadow-lg dashhead":'dashhead displayhidden'}>
            <h1>Partner Portal</h1>
            {id===1?<div onClick={()=>props.history.push('dashboard')} className="menu-container-active">
                <p><HomeIcon /> <span className="pl-1">Home</span></p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('dashboard')} >
            <p><HomeOutlinedIcon /> <span className="pl-2">Home</span></p>
            </div>
            }

            {id===2?<div className="menu-container-active" onClick={()=>props.history.push('products')}>
                <p><AddShoppingCartIcon /> <span className="pl-1">Products</span></p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('products')}>
            <p><AddShoppingCartIcon /> <span className="pl-2">Products</span></p>
            </div>
            }

            {id===3?<div className="menu-container-active" onClick={()=>props.history.push('completedorders')}>
                <p><ArticleIcon /> <span className="pl-1">Completed Orders</span></p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('completedorders')}>
            <p><ArticleIcon /> <span className="pl-2">Completed Orders</span></p>
            </div>
            }

            {/* {id===2?<div className="menu-container-active" onClick={()=>props.history.push('merchants')}>
                <p><NoteAddIcon /> <span className="pl-1">Merchants</span></p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('merchants')}>
            <p><NoteAddOutlinedIcon /> <span className="pl-2">Merchants</span></p>
            </div>
            }

            {id===3?<div className="menu-container-active" onClick={()=>props.history.push('schemes')} >
                <p><EventAvailableIcon /> <span className="pl-1">Schemes</span></p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('schemes')} >
            <p><EventAvailableOutlinedIcon /> <span className="pl-2">Schemes</span></p>
            </div>
            }

            {id===4?<div className="menu-container-active" onClick={()=>props.history.push('schemesapproval')} >
                <p><EventAvailableIcon /> <span className="pl-1">Schemes Approval</span></p>
            </div>:
            <div className="menu-container" onClick={()=>props.history.push('schemesapproval')} >
            <p><EventAvailableOutlinedIcon /> <span className="pl-2">Schemes Approval</span></p>
            </div>
            } */}

            <div onClick={()=>{
                props.deleteUser();
                props.history.push("/")
            }} className="mt-3" style={{textAlign:"center"}}>
                <Button startIcon={<LogoutIcon />} variant="contained" color="secondary">Logout</Button>
            </div>



            
        </div>
    );
}

const mapStateToProps = ({EventUser})=>{
    return {
        user:EventUser
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
        deleteUser:()=>dispatch(deleteUser())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Dashhead));