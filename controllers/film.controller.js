import Film from "../models/film.js";

async function saveFilm(req, res) {
    try{
        const film = await Film.create(req.body);
        if(!film){
            return res.status(400).json({
                message:"Film did not save properly.."
            })
        }
        return res.status(200).json({
            message: "film save successfully",
            data: film
        })

    }catch(e){
        return res.status(500).json({
            message: "server error",
            error: e.message
        })
    }
}



async function getAllFilms(req, res) {
    try{
        const films = await Film.find()
        if(!films){
            return res.status(400).json({
                message:"Film did not get properly.."
            })
        }
        return res.status(200).json({
            message: "film details get successfully",
            data: films
        })

    }catch(e){
        return res.status(500).json({
            message: "server error",
            error: e.message
        })
    }
}



async function updateFilm(req, res) {
    try{
        const id = req.params.id;
        const film = await Film.findById(id);
        if(!film){
            return res.status(400).json({
                message:"Film not found"
            })
        }
       const updateFilm = await Film.findByIdAndUpdate(id,req.body,{new:true})
        return res.status(200).json({
            message: "film update successfully",
            data: updateFilm
        })

    }catch(e){
        return res.status(500).json({
            message: "server error",
            error: e.message
        })
    }
}



async function deleteFilm(req, res) {
    try{
        const id = req.params.id;
        const film = await Film.findById(id);
        if(!film){
            return res.status(400).json({
                message:"Film not found"
            })
        }
        const deleteFilm = await Film.findByIdAndDelete(id)
        return res.status(200).json({
            message: "film delete successfully",
            data: updateFilm
        })

    }catch(e){
        return res.status(500).json({
            message: "server error",
            error: e.message
        })
    }
}


export default {saveFilm,updateFilm,deleteFilm,getAllFilms}