import Film from "../models/Film";
export default { getAll, getSingle, create };

async function getAll({ req, res }: { req: any; res: any }) {
  const films = await Film.find();
  res.json(films);
}

async function getSingle({ req, res }: { req: any; res: any }) {
  const film = await Film.findById(req.params.id);

  if (!film) {
    res.status(404).json({ message: "Film nicht gefunden" });
    return;
  }
  res.json(film);
}

async function create({ req, res }: { req: any; res: any }) {
  const films = req.body;

  const savedFilms = [];

  for (const filmData of films) {
    const newFilm = new Film({
      title: filmData.title,
      thumb: filmData.thumb,
      poster: filmData.poster,
      description: filmData.description,
      appetizer: filmData.appetizer,
      director: filmData.director,
      year: filmData.year,
      stars: parseInt(filmData.stars, 10),
    });

    const savedFilm = await newFilm.save();
    savedFilms.push(savedFilm);
  }

  res.status(201).json(savedFilms);
}
