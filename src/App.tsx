import { Route, Routes } from "react-router-dom"
import Posts from "./pages/posts"
import AddPost from "./pages/addPost"
import Notfound from "./components/notfound"
import Header from "./components/header"

function App() {

  return (
    <div style={{ maxWidth: "1440px", margin: "auto", padding: "2rem" }}>
      <Header />
      <main >
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="posts/add" element={<AddPost />} />
          <Route path="posts/edit/:id" element={<AddPost />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
