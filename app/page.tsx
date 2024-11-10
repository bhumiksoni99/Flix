import Navbar from "./components/Navbar";
import User from "./components/User";
import withAuth from "./components/withAuth";
import axios from "axios";
import BillBoard from "./components/BillBoard";
import MovieList from "./components/MovieList";
import AllMovieLists from "./components/AllMovieLists";
import InfoModal from "./components/InfoModal";

async function Home() {
  // const uploadMovies = async () => {
  //   try {
  //     const res = await axios.post("http://localhost:3000/api/movie-upload", {
  //       movies,
  //     });
  //   } catch (e) {
  //     console.log("s", e);
  //   }
  // };
  // await uploadMovies();

  // const { data } = await axios.get("http://localhost:3000/api/get-movies");

  return (
    <div className="h-screen">
      <Navbar />
      <BillBoard />
      <AllMovieLists />
    </div>
  );
}

export default withAuth(Home);
