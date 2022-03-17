import { RETRIEVE_PELICULAS, 
  RETRIEVE_PELICULA, 
  CHANGE_KEY, 
  CLEAN_PELICULA, 
  CREATE_PELICULA,
   UPDATE_PELICULA, 
   DELETE_PELICULA, 
  DELETE_PELICULAS, 
  SEARCH_PELICULAS,
  CLEAN_DETALLE} from "../actions/types";
import { peliculasInterface } from "../model/peliculaInterface";

const initialState = {
  detallePeliculas: new peliculasInterface(),
  peliculas: [],
};

const peliculasReducer = function (state = initialState, { payload, type }) {
  switch (type) {
    case SEARCH_PELICULAS:
    case RETRIEVE_PELICULAS: {
      return {
        ...state,
        peliculas: payload,
      };
    }

    case CREATE_PELICULA: {
      return {
        ...state,
        peliculas: [...state.peliculas, payload],
      };
    }

    case UPDATE_PELICULA: {
      return {
        ...state,
        peliculas: state.peliculas.map((item) =>
          item.id_pelicula === payload.id_pelicula ? payload : item
        ),
      };
    }

    case DELETE_PELICULA: {
      return {
        ...state,
        peliculas: state.peliculas.filter((item) =>
          item.id_pelicula != payload
        ),
      };
    }
    case CLEAN_PELICULA:
    case DELETE_PELICULAS: {
      return {
        ...state,
        peliculas: []
      };
    }

    case CHANGE_KEY: {
      return {
        ...state,
        detallePeliculas: {
          ...state.detallePeliculas,
          ...payload,
        },
      };
    }

    case RETRIEVE_PELICULA: {
      return {
        ...state,
        detallePeliculas: new peliculasInterface(payload)
      };
    }

    case CLEAN_DETALLE: {
      return {
        ...state,
        detallePeliculas: new peliculasInterface(),
      }
    }


    default:
      return state;
  }
};
export default peliculasReducer;

