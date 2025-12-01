import React from 'react'
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const CatDetail = ({ cats }) => {
    const {catId} = useParams();
    const cat = cats.find((cat) => String(cat.id) === catId);
    if (!cat) {
        return <p>Kuş bilgisi bulunamadı.</p>;
      }
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>{cat.name} Detayları</h2>
      <p><strong>Tür:</strong> {cat.type}</p>
      <p><strong>Yaş:</strong> {cat.age} yıl</p>
      <p><strong>Fiyat:</strong> {cat.price ? `$${cat.price}` : 'Ücretsiz'}</p>
      <p><strong>Sahip:</strong> {cat.email}</p>
      <p><strong>Lokasyon:</strong> {cat.location}</p>
      <p><strong>Açıklama:</strong> {cat.description}</p>
      <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>← Geri Dön</Link>
    </div>  )
};

const mapStateToProps = (state) => ({
    cats: state.cats.cats,
})

export default connect (mapStateToProps)(CatDetail);