import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useLanguage } from "../context/LanguageContext";

// Komponen peta interaktif ala mapcn — dibangun langsung di atas MapLibre GL
// (engine yang sama dipakai mapcn) dan di-style pakai CSS variables milik
// SHIFTCOMP sendiri, karena project ini belum pakai Tailwind/shadcn.
// Pakai basemap gratis dari CARTO, tanpa perlu API key.

const BASEMAP_STYLE = "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";

export default function LocationMap({ center, zoom = 15, label, address, className = "" }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [ready, setReady] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: BASEMAP_STYLE,
      center,
      zoom,
      attributionControl: false,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(new maplibregl.AttributionControl({ compact: true }));

    const markerEl = document.createElement("div");
    markerEl.className = "location-map__marker";

    const popup = new maplibregl.Popup({ offset: 22, closeButton: false }).setHTML(
      `<div class="location-map__popup"><strong>${label}</strong><br/>${address}</div>`
    );

    new maplibregl.Marker({ element: markerEl })
      .setLngLat(center)
      .setPopup(popup)
      .addTo(map);

    map.on("load", () => setReady(true));
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className={`location-map ${className}`}>
      <div ref={containerRef} className="location-map__canvas" />
      {!ready && (
        <div className="location-map__loading">
          <span className="location-map__spinner" />
          {t("common.loadingMap")}
        </div>
      )}
    </div>
  );
}
