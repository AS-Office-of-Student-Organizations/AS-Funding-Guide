import { useEffect, useState } from "react";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "./firebase.js";

function FundingGuide() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchFundingGuide = async () => {
      const querySnapshot = await getDocs(collection(db, "fundingGuide"));
      console.log(querySnapshot);
      const items = querySnapshot.docs.map(doc => doc.data());
      setData(items);
    };
    fetchFundingGuide();
  }, []);

  return (
    <div>
      <h1>Funding Guide</h1>
      {data.map((item, index) => (
        <div key={index}>
          <h3>{item.content}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default FundingGuide;