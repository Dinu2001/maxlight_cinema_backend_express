import express from "express";
import FilmController from "../controllers/film.controller.js";


const router = express.Router();

router.get("/",FilmController.getAllFilms)
router.post("/",FilmController.saveFilm)
router.put("/",FilmController.updateFilm)
router.delete("/",FilmController.deleteFilm)


export default router;