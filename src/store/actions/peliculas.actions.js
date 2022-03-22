import {
  RETRIEVE_PELICULAS,
  RETRIEVE_PELICULA,
  CHANGE_KEY,
  CLEAN_PELICULA,
  CREATE_PELICULA,
  UPDATE_PELICULA,
  DELETE_PELICULAS,
  DELETE_PELICULA,
  CLEAN_DETALLE,
  SEARCH_PELICULAS
} from './types';

import PeliculaDataService from '../../services/pelicula.service';

export const retrievePeliculas = () => async (dispatch) => {
  try {
    const res = await PeliculaDataService.getAll();
    dispatch({
      type: RETRIEVE_PELICULAS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const retrievePelicula = (id) => async (dispatch) => {
  try {
    const res = await PeliculaDataService.get(id);
    dispatch({
      type: RETRIEVE_PELICULA,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const changeKeyPeliculas = (data) => {
  return {
    type: CHANGE_KEY,
    payload: data,
  };
}

export const createPelicula =
  (nombre, genero, anio, autor, datetime) => async (dispatch) => {
    try {
      const res = await PeliculaDataService.create({
        nombre,
        genero,
        anio,
        autor,
        datetime,
      });
      dispatch({
        type: CREATE_PELICULA,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

  export const updatePelicula = (id, data) => async (dispatch) => {
    console.log(data);
    try{
      const res = await PeliculaDataService.update(id, data);
      dispatch({
        type: UPDATE_PELICULA,
        payload: data,
      });
      return Promise.resolve(res.data);
    }catch(err){
      return Promise.reject(err);
    }
  }

  export const deletePelicula = (id ) => async (dispatch) => {
    try {
      const res = await PeliculaDataService.delete(id);
      dispatch({
        type: DELETE_PELICULA,
        payload: id,
      });
      return Promise.resolve(res.data);
    }catch(err){
      return Promise.reject(err);
    }
  }

  export const deletePeliculas = ( ) => async (dispatch) => {
    try {
      const res = await PeliculaDataService.deleteAll();
      dispatch({
        type: DELETE_PELICULAS,
      });
      return Promise.resolve(res.data);
    }catch(err){
      return Promise.reject(err);
    }
  }

  export const findPeliculasByNombre = (nombre) => async (dispatch) => {
    try {
      const res = await PeliculaDataService.findByNombre(nombre);
      dispatch({
        type: SEARCH_PELICULAS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const cleanPelicula = () =>{
  return{
        type: CLEAN_PELICULA
  }
}

export const cleanDetalle = () =>{
  return{
        type: CLEAN_DETALLE
  }
}