import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useEffect, useState } from "react";

import { getIssues } from "../services/issueService";

function LocationMarker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const coords = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };

      setPosition(coords);

      if (onLocationSelect) {
        onLocationSelect(coords);
      }
    },
  });

  return position ? <Marker position={position} /> : null;
}

function FlyToLocation({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 16, {
        animate: true,
      });
    }
  }, [position, map]);

  return null;
}

function MapComponent({
  onLocationSelect,
  filters,
}) {
  const [issues, setIssues] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    fetchIssues();
  }, [filters]);

  const fetchIssues = async () => {
    try {
      const data = await getIssues(filters);

      setIssues(data);
    } catch (err) {
      console.log(err);
    }
  };

  const locateMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        setCurrentLocation(coords);
      },
      () => {
        alert("Unable to fetch location.");
      }
    );
  };

  return (
    <div
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div className="mb-3">
        <button
          className="btn btn-primary"
          onClick={locateMe}
        >
          📍 Use My Location
        </button>
      </div>

      <MapContainer
        center={[28.6139, 77.209]}
        zoom={12}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyToLocation position={currentLocation} />

        {currentLocation && (
          <Marker position={currentLocation}>
            <Popup>
              📍 You are here
            </Popup>
          </Marker>
        )}

        <LocationMarker
          onLocationSelect={onLocationSelect}
        />

        {issues.map((issue) => {
          if (
            !issue.coordinates ||
            issue.coordinates.latitude == null ||
            issue.coordinates.longitude == null
          ) {
            return null;
          }

          return (
            <Marker
              key={issue._id}
              position={[
                issue.coordinates.latitude,
                issue.coordinates.longitude,
              ]}
            >
              <Popup>
                <h6>{issue.title}</h6>

                <p>{issue.description}</p>

                <p>
                  <strong>📍</strong>{" "}
                  {issue.location}
                </p>

                <p>
                  <strong>🏷 Category:</strong>{" "}
                  {issue.category}
                </p>

                <p>
                  <strong>⚡ Priority:</strong>{" "}
                  {issue.priority}
                </p>

                <p>
                  <strong>🏛 Department:</strong>{" "}
                  {issue.department}
                </p>

                <p>
                  <strong>📌 Status:</strong>{" "}
                  {issue.status}
                </p>

                <p>
                  👍 {issue.upvotes} Upvotes
                </p>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default MapComponent;