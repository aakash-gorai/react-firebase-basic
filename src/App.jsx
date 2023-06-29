import { useEffect, useState } from "react";
import "./App.css";
import Auth from "../src/components/Auth.jsx";
import { db, auth, storage } from "../src/config/firebase-config";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
function App() {
  const [change, setChange] = useState(true);

  //fetch movies
  const [movieList, setMovieList] = useState([]);

  //Add New movies
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieReleaseDate, setNewMovieReleaseDate] = useState(0);
  const [isNewMovieOscar, setisNewMovieOscar] = useState(false);

  //update new movies
  const [updatedTitle, setUpdatedTitle] = useState("");

  //upload files
  const [uploadFile, setUploadFile] = useState(null);

  const movieListRef = collection(db, "movies");

  // add movie function
  const addMovieList = async () => {
    try {
      await addDoc(movieListRef, {
        title: newMovieTitle,
        date: newMovieReleaseDate,
        flop_hit: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      setChange(!change);
    } catch (error) {
      console.error(error);
    }
  };

  // delete movie function
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    setChange(!change);
  };

  //update movie function
  const updateMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, {
      title: updatedTitle,
    });
    setChange(!change);
  };

  //fetch movie function
  useEffect(() => {
    const getMovieList = async () => {
      try {
        const data = await getDocs(movieListRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovieList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };
    getMovieList();
  }, [change]);

  //upload file function
  const addFile = async () => {
    if (!uploadFile) return;
    const fileRef = ref(storage, `list/${uploadFile.name}`);
    try {
      await uploadBytes(fileRef, uploadFile);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Auth />
      <h1>Add New Movie</h1>
      <div className="data-base">
        <input
          type="text"
          placeholder="Movie Title"
          onChange={(event) => {
            setNewMovieTitle(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Release Date"
          onChange={(event) => {
            setNewMovieReleaseDate(event.target.value);
          }}
        />
        <input
          type="checkbox"
          name="oscar"
          checked={isNewMovieOscar}
          onChange={(event) => {
            setisNewMovieOscar(event.target.checked);
          }}
        />
        <label htmlFor="oscar">Received Oscar</label>
        <button onClick={addMovieList}>Submit</button>
      </div>
      <div className="data-base">
        <h2>Movie List</h2>
        {movieList.map((movie) => (
          <div>
            <h2>Title: {movie.title}</h2>
            <p>Date : {movie.date}</p>
            <br />
            <button onClick={() => deleteMovie(movie.id)}>
              Delete Above Movie
            </button>
            <br />
            <br />
            <input
              type="text"
              name="updatedTitle"
              id="UpdatedTitle"
              onChange={(event) => {
                setUpdatedTitle(event.target.value);
              }}
            />
            <button onClick={() => updateMovie(movie.id)}>Update Title</button>
          </div>
        ))}
        <div>
          <h1>Upload File</h1>
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) => setUploadFile(e.target.files[0])}
          />
          <button type="button" onClick={addFile}>
            Upload{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
