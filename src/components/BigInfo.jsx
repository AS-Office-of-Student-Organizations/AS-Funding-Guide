import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import DropdownBox from "./DropdownBox.jsx"

function BigInfo() {
    const [data, setData] = useState([]);
    const db = getFirestore()

    useEffect(() => {
      const fetchBigInfo = async () => {
        try{
          const docRef = doc(db, "bigInfo", "r4XYAOkvPfQY9NdNJDqz"); // hard code for now
          const docSnap = await getDoc(docRef)
          if(docSnap.exists()){
            setData(docSnap.data().boxes)
          } else{
            console.error("no such document!")
          }
        } catch (error) {
          console.error("Error fetching biginfo:", error);
        }
      };

      fetchBigInfo();
    }, []);

    return (
        <div className="big-info">
          {data.length === 0 ? (
            <p>Loading...</p>
          ) : (
            data.map((item, index) => (
              <div key={index}>
                <DropdownBox 
                  header={item.content} 
                  text={item.description}
                ></DropdownBox>
              </div>
            ))
          )}
        </div>
      );
}

export default BigInfo;