import React from 'react';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

const BirdDetail = ({ birds }) => {
  const { birdId } = useParams(); // URL'deki birdId'yi al
  const bird = birds.find((bird) => String(bird.id) === birdId); // Redux state'inden kuşu bul

  if (!bird) {
    return <p>Kuş bilgisi bulunamadı.</p>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>{bird.name} Detayları</h2>
      <p><strong>Tür:</strong> {bird.type}</p>
      <p><strong>Yaş:</strong> {bird.age} yıl</p>
      <p><strong>Fiyat:</strong> {bird.price ? `$${bird.price}` : 'Ücretsiz'}</p>
      <p><strong>Sahip:</strong> {bird.email}</p>
      <p><strong>Lokasyon:</strong> {bird.location}</p>
      <p><strong>Açıklama:</strong> {bird.description}</p>
      <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>← Geri Dön</Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  birds: state.birds.birds, // Redux'taki tüm kuşları alın
});

export default connect(mapStateToProps)(BirdDetail);
