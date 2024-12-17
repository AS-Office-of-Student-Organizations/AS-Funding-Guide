import { useEffect, useState } from "react";
import { collection, doc, getDocs, addDoc, deleteDoc } from "@firebase/firestore";
import { db } from "./firebase.js";

function AdminPanel() {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState({ content: "", description: ""});

  const fetchFundingGuide = async () => {
    const querySnapshot = await getDocs(collection(db, "fundingGuide"));
    const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setData(items);
  };

  useEffect(() => { 
    fetchFundingGuide();
  }, []);

  const handleAddItem = async () => {
    try {
      await addDoc(collection(db, "fundingGuide"), newItem);
      setData([...data, newItem]);
      setNewItem({ content: "", description: ""});
      alert("Item added!");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
        console.log(id)
        await deleteDoc(doc(db, "fundingGuide", id))
        alert("Item deleted!")
        fetchFundingGuide();
    } catch(error) {
        console.error("Error deleting item:", error)
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <h2>Funding Guide Items</h2>
      {data.map((item, index) => (
        <div key={index}>
          <h3>{item.content}</h3>
          <p>{item.description}</p>
          <button onClick={() => handleDeleteItem(item.id)}>Delete Item</button>
        </div>
      ))}

      <h2>Add New Item</h2>
      <input
        type="text"
        placeholder="Content"
        value={newItem.content}
        onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={newItem.description}
        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
      />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
}

export default AdminPanel;
