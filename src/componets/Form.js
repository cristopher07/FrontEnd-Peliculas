import React from "react";
import ButtonComponent from "./Button";
import InputFile from "./InputFile";
import TextField from "./TextField";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { height } from "@mui/system";
import { useToasts } from 'react-toast-notifications';
import { changeKeyPeliculas } from "../store/actions/peliculas.actions";
import { useDispatch, useSelector } from "react-redux";

const FormLica = () => {

    const { addToast } = useToasts()

    const dispatch = useDispatch();

    const detallePelicula = useSelector(({ state }) => state.detallePeliculas);

    

    const handleChange = (e) => {
        let data = { [e.target.name]: e.target.value };
        dispatch(changeKeyPeliculas(data));
    };

    const save = () => {
        addToast("hOLA MUNDO", {
            appearance: 'success',
            autoDismiss: true,
        })
    };

    return (
        <div  >
            <Paper style={{
                display: "flex",
                justifyContent: "center",
                alignSelf: "center",
            }}>
                <Grid container >

                    <Grid item lg={6} xs={12}>
                        <InputFile 
                        id="nombre"
                        name="nombre"
                        onChange={handleChange}
                        variante="outlined"
                         texto="Nombre"
                         value={detallePelicula?.nombre ||""}></InputFile>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <InputFile 
                        id="autor"
                        name="autor"
                        onChange={handleChange}
                        variante="outlined" 
                        texto="Autor"
                        value={detallePelicula?.autor  ||""}></InputFile>
                    </Grid>
                    <Grid item lg={6} xs={12}>

                        <InputFile 
                        id="genero"
                        name="genero"
                        onChange={handleChange}
                        variante="outlined"
                         texto="Género"
                         value={detallePelicula?.genero  ||""}></InputFile>
                    </Grid>
                    <Grid item lg={6} xs={12}>
                        <InputFile 
                        type="number"
                        id="anio"
                        name="anio"
                        onChange={handleChange}
                        maxLength={4}
                        variante="outlined" 
                        texto="Año"
                        value={detallePelicula?.anio  ||""}></InputFile>
                    </Grid>

                </Grid>
            </Paper>
        </div>
    );
}
export default FormLica;