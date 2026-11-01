"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import type { TransportRoute } from "@/lib/data";

const icon = L.divIcon({
  className: "route-marker",
  html: "<span></span>",
  iconSize: [18, 18],
  iconAnchor: [9, 9]
});

export function RouteMap({ route, height = 360 }: { route: TransportRoute; height?: number }) {
  const center = route.path[Math.floor(route.path.length / 2)] ?? [33.5138, 36.2765];

  return (
    <div className="overflow-hidden rounded-lg border border-black/10 shadow-sm" style={{ height }}>
      <MapContainer center={center} zoom={12} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={route.path} pathOptions={{ color: "#1f9d7a", weight: 5 }} />
        {route.stops.map((stop) => (
          <Marker key={stop.id} position={stop.coordinates} icon={icon}>
            <Popup>
              <strong>{stop.student}</strong>
              <br />
              {stop.neighborhood} - {stop.pickupTime}
            </Popup>
          </Marker>
        ))}
        <Marker position={route.path[route.path.length - 1]} icon={icon}>
          <Popup>{route.name}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
