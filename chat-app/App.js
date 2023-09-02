// import tool
import { ScrollView } from "react-native";
import { useState } from "react";

// import all the component
import { Home } from "./Component/Home ";
import { Navbar } from "./Component/Navbar";
import { Notes } from "./Page/Notes";
import { Calendar } from "./Page/Calendar/Calendar";
import { Theory } from "./Page/Theory";
import { Chat } from "./Page/Chat"


export default function App() {
  const [showMenu, setShowMenu] = useState(true);
  const [category, setCategory] = useState("");

  const backToHome = () => setShowMenu(true);

  const checkCategory = (category) => {
    setShowMenu(false);
    setCategory(category);
  };

  return (
    <>
      {showMenu ? (
        <ScrollView>
          <Navbar />
          <Home closeHome={checkCategory} />
        </ScrollView>
      ) : (
        <>
          {category === "calendar" && <Calendar backToHome={backToHome} />}
          {category === "note" && <Notes backToHome={backToHome} />}
          {category === "chat" && <Chat backToHome={backToHome} />}
          {category === "theory" && <Theory backToHome={backToHome} />}
        </>
      )}
    </>
  );
}
