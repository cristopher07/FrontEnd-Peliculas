
import React from "react";
import Typography from '@mui/material/Typography';

 const TextField = props => {

    return (
        <div style={{ margin: "3%"}}>
            <Typography variant={props.variante} gutterBottom component="div">
               {props.texto}
            </Typography>
        </div>
    )
};


export default TextField;