import React from 'react';
import api from '../services/api';
import ListingCard from '../components/ListingCard';
// Make sure you have this component

const Home = () => {
  const [data, setData] = React.useState([]);

  const FetchData = async () => {
    try {
      const response = await api.get('/allListings');
      const jsData = response.data;
      console.log(jsData);
      setData(jsData);
    } catch (error) {
      console.error("Failed to fetch listings", error);
    }
  };

  React.useEffect(() => {
    FetchData();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Listings</h1>
      {!data.length ? (
        <p>Loading...</p>
      ) : (
        data.map((item) => (
          <ListingCard key={item.id} item={item} />
        ))
      )}
    </main>
  );
};

export default Home;
