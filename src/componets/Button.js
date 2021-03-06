import React from 'react';
import Button from '@mui/material/Button';



const ButtonComponent = (props) => {
   
    return (
        <div
        style={{
            margin: "3%"
        }}>
            <Button onClick={ () => props.onClick()}
            variant={props.variante}>
                {props.texto}
            </Button>
        </div>
    );
}




export default ButtonComponent;