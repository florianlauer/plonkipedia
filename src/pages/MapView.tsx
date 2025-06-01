import { useLanguageContext } from "../context/LanguageContext";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapFilters from "../components/map/MapFilters";
import { useState } from "react";
import type { HintFilters } from "../hooks/useHintsQuery";
import GeoJSONLayer from "@/components/map/GeoJSONLayer";

interface MapTileLayerProps {
  locale?: string;
}

const GoogleMapLayer = ({ locale }: MapTileLayerProps) => {
  const hl = locale && locale.split("-")[0];
  const hlParams = hl ? `&hl=${hl}` : "";
  return (
    <TileLayer
      key={`googlemap_${hl}`}
      url={`https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}&s=Ga${hlParams}`}
      maxZoom={20}
      subdomains={["mt0", "mt1", "mt2", "mt3"]}
    />
  );
};

const MapView = () => {
  const { language } = useLanguageContext();
  const [, setFilters] = useState<HintFilters>({});

  const handleFilterChange = (newFilters: Partial<HintFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="fixed inset-x-0 bottom-[64px] top-[64px] z-0">
      <div className="flex h-full">
        <div className="w-80 bg-white border-r border-purple-20/25 flex flex-col relative z-20">
          <div className="flex-1 overflow-hidden">
            <MapFilters onFilterChange={handleFilterChange} />
          </div>
        </div>

        <div className="flex-1 relative z-10">
          <MapContainer
            center={[20, 0]}
            zoom={2}
            className="w-full h-full"
            zoomControl={false}
          >
            <GoogleMapLayer locale={language} />
            {/* <GeoJSONLayer url="/data.geojson" renderMode="normal" /> */}
            <GeoJSONLayer
              url="/Australia.geojson"
              renderMode="pixi"
              markerType="demo"
            />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapView;
