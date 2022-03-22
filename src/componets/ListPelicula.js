import React, { useEffect } from "react";
import ButtonComponent from "./Button";
import InputFile from "./InputFile";
import TextField from "./TextField";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { height } from "@mui/system";
import { useToasts } from 'react-toast-notifications';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  cleanPelicula, retrievePelicula, retrievePeliculas, createPelicula, updatePelicula,
  deletePelicula, deletePeliculas, findPeliculasByNombre, cleanDetalle
} from "../store/actions/peliculas.actions";
import FormDialog from "./Dialog";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";



const ListPelicula = () => {




  const [open, setOpen] = React.useState(false);
  const [tipo, setTipo] = React.useState(false);
  const [searchPelicula, setSearchPelicula] = React.useState("");

  const { addToast } = useToasts();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrievePeliculas());
  }, [dispatch]);

  const detallePelicula = useSelector(({ state }) => state.detallePeliculas);

  const peliculas = useSelector(({ state }) => state.peliculas);



  const onChangeSearchPelicula = (e) => {
    const searchPelicula = e.target.value;
    setSearchPelicula(searchPelicula);
  };

  const handleClickOpen = () => {
    dispatch(cleanDetalle())
    setOpen(true);
    setTipo("create");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deletePelicula(detallePelicula.id_pelicula))
      .then(() => {
        addToast("La información se ha eliminado correctamente.", {
          appearance: "error",
          autoDismiss: true,
        });
        setOpen(false);
      })
  }

  const handleDeleteAll = () => {
    dispatch(deletePeliculas())
      .then(() => {
        addToast("Se ha eliminado toda la información", {
          appearance: "error",
          autoDismiss: true,
        });
        setOpen(false);
      })
  }

  const verDetallePelicula = (id) => {
    dispatch(retrievePelicula(id));
    setOpen(true)
    setTipo("update")
  };

  const refresData = () =>{
    dispatch(cleanPelicula());
  }

  const findByPeliculas = () =>{

      if(searchPelicula===""){
        dispatch(retrievePeliculas());
      }
      else{
        dispatch(findPeliculasByNombre(searchPelicula));
      }
      refresData();
  }
  const handleCreateOrEdit = () => {

    const { id_pelicula, nombre, genero, anio, autor, datetime } = detallePelicula;
    if (id_pelicula === null) {
      dispatch(createPelicula(nombre, genero, anio, autor, datetime))
        .then(() => {
          addToast("La información se ha insertado correctamente.", {
            appearance: "success",
            autoDismiss: true,
          });
          setOpen(false);
        })
        .catch((e) => {
          addToast("Ha sucedido un error", {
            appearance: "error",
            autoDismiss: true,
          });
          setOpen(false);
        });
    } else {
      dispatch(updatePelicula(id_pelicula, detallePelicula))
        .then(() => {
          addToast("La información se ha actualizado correctamente.", {
            appearance: "info",
            autoDismiss: true,
          });
          setOpen(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };


console.log(peliculas)

  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      sortable: true,
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "autor",
      headerName: "Autor",
      sortable: true,
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "genero",
      headerName: "Género",
      sortable: true,
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "anio",
      headerName: "Año",
      sortable: true,
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "datetime",
      headerName: "Fecha ingreso",
      sortable: true,
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "action",
      headerAlign: "center",
      headerName: "Acciones",
      renderCell: (params) => {
        return (
          <button
            onClick={() => verDetallePelicula(params.row.id_pelicula)}
            className="btn btn-warning btn-sm"
          >
            Editar
          </button>
        );
      },
      align: "center",
    },
  ];

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      background: "white",
      height: "100vh",
      flexDirection: "column"
    }} >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <div style={{ width: "50%" }}>
          <InputFile
            variante="filled"
            type="text"
            texto="Buscar por agencia"
            value={searchPelicula}
            onChange={onChangeSearchPelicula}
          />
        </div>

        <ButtonComponent
          texto="Buscar"
          variante="outlined"
          onClick={findByPeliculas}
        ></ButtonComponent>
      </div>


      <Paper style={{
        display: "flex",
        justifyContent: "center",
        alignSelf: "center",
        flexDirection: "column"
      }}>
        <TextField

          variante="h4" texto="Listado Películas"></TextField>
        <div style={{ height: 300, width: 900 }}>

          <DataGrid
            rows={peliculas}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            getRowId={(row) => row.id_pelicula}
          />
        </div>

        <div style={{
          display: "flex",
          bottom: 10,
          right: 10,
          position: "absolute"
        }}>
          <Fab color="primary" aria-label="add"
            onClick={handleClickOpen}>
            <AddIcon />
          </Fab>

        </div>
        <ButtonComponent
          variante="outlined"
          texto="Borrar Todo"
          onClick={handleDeleteAll}
        ></ButtonComponent>
      </Paper>
      <FormDialog tipo={tipo}
        open={open}
        handleClose={handleClose}
        handleDelete={handleDelete}
        handleCreateOrEdit={handleCreateOrEdit}
      ></FormDialog>
    </div>
  );
}

export default ListPelicula;