import { FormatAlignCenter } from "@mui/icons-material";
import moment from "moment";

export const peliculasInterface = (data = {}) => {
    return{
        id_pelicula: data?.id_pelicula || null,
        nombre: data?.nombre || "",
        genero: data?.genero || "",
        autor: data?.autor || "",
        anio: data?.anio || "",
        datetime: moment().format("lll")  || "",
        
    }
}