import React from "react";
import "../Styles/CastDetails.css";

const CastDetails = ({ cast }) => {
  return (
    <div className="cast-details">
      <ul className="cast-list">
        {cast.map((castMember) => (
          <li key={castMember.id} className="cast-item">
            <img
              src={`https://image.tmdb.org/t/p/w200/${castMember.profile_path}`}
              alt={castMember.name}
              className="cast-image"
            />
            <div className="cast-info">
              <p className="cast-name">{castMember.name}</p>
              <p className="cast-character">{castMember.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CastDetails;
