import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost/data/condicao?page=${currentPage}&limit=10`);
        setData(prevData => [...prevData, ...response.data]);
        if (!totalPages) {
          setTotalPages(parseInt(response.headers['x-total-pages'], 10));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Erro ao buscar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <h2>Dados de Condição</h2>
      {loading && <p>Carregando dados...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          <table className="table-auto">
            <thead>
              <tr>
                <th>ID</th>
                <th>Data de Coleta</th>
                <th>Temperatura (°C)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any) => (
                <tr key={item.id}>
                  <td >{item.id}</td>
                  <td>{new Date(item.dataDeColeta).toLocaleString()}</td>
                  <td>{item.temperatura}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {currentPage < totalPages! && (
            <button onClick={handleLoadMore} disabled={loading}>
              Carregar Mais
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
