import React from 'react'
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const DogDetail = ({dogs}) => {
    const {dogId} = useParams();
    const dog = dogs.find((dog) => String(dog.id) === dogId);
    if (!dog) {
        return <p>Köpek bilgisi bulunamadı.</p>;
      }
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
    <h2>{dog.name} Detayları</h2>
    <p><strong>Tür:</strong> {dog.type}</p>
    <p><strong>Yaş:</strong> {dog.age} yıl</p>
    <p><strong>Fiyat:</strong> {dog.price ? `$${dog.price}` : 'Ücretsiz'}</p>
    <p><strong>Sahip:</strong> {dog.email}</p>
    <p><strong>Lokasyon:</strong> {dog.location}</p>
    <p><strong>Açıklama:</strong> {dog.description}</p>
    <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>← Geri Dön</Link>
  </div>    )
}

const mapStateToProps = (state) => ({
    dogs: state.dogs.dogs,
})

export default connect (mapStateToProps)(DogDetail);