import Navbar from "./components/Navbar";
// import withAuth from "./components/withAuth";
import BillBoard from "./components/BillBoard";
import AllMovieLists from "./components/AllMovieLists";

function Home() {
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

export default Home;
