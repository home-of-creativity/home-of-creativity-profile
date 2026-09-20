export function googleMapsApiKey(): string {
  return (
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ||
    process.env.NEXT_PUBLIC_GOOGLE_API_KEY?.trim() ||
    ""
  );
}

export function googleMapsEmbedSrc(
  query: string,
  locale: "ar" | "en",
  zoom = 15,
  coords?: { latitude: number; longitude: number },
): string | null {
  const key = googleMapsApiKey();
  const q = coords ? `${coords.latitude},${coords.longitude}` : query.trim();
  if (!key || !q) return null;

  const params = new URLSearchParams({
    key,
    q,
    zoom: String(zoom),
    language: locale === "ar" ? "ar" : "en",
  });

  return `https://www.google.com/maps/embed/v1/place?${params.toString()}`;
}

export function googleMapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query.trim())}`;
}

export function googleMapsClassicEmbedSrc(
  latitude: number,
  longitude: number,
  locale: "ar" | "en",
  zoom = 15,
  query?: string,
): string {
  const params = new URLSearchParams({
    q: query?.trim() ? `${query.trim()}@${latitude},${longitude}` : `${latitude},${longitude}`,
    z: String(zoom),
    hl: locale === "ar" ? "ar" : "en",
    output: "embed",
  });

  return `https://maps.google.com/maps?${params.toString()}`;
}

type GoogleLatLng = { lat: number; lng: number };

export type GoogleMapHandle = {
  setCenter: (position: GoogleLatLng) => void;
  setZoom: (zoom: number) => void;
  setMarker: (position: GoogleLatLng, title: string) => void;
};

type GoogleMapsApi = {
  Map: new (
    element: HTMLElement,
    options: Record<string, unknown>,
  ) => {
    setCenter: (position: GoogleLatLng) => void;
    setZoom: (zoom: number) => void;
  };
  Marker: new (options: Record<string, unknown>) => {
    setPosition: (position: GoogleLatLng) => void;
    setTitle: (title: string) => void;
    setMap: (map: unknown) => void;
  };
  marker?: {
    AdvancedMarkerElement: new (options: Record<string, unknown>) => {
      position: GoogleLatLng;
      title: string;
      map: unknown;
    };
  };
};

type MapsWindow = Window & {
  google?: { maps?: GoogleMapsApi };
  __hocGoogleMaps?: Promise<GoogleMapsApi>;
  __hocGoogleMapsReady?: () => void;
};

export function loadGoogleMapsApi(): Promise<GoogleMapsApi> {
  const key = googleMapsApiKey();
  if (!key) {
    return Promise.reject(new Error("Google Maps API key missing"));
  }

  const w = window as MapsWindow;
  if (w.google?.maps?.Map) {
    return Promise.resolve(w.google.maps);
  }
  if (w.__hocGoogleMaps) {
    return w.__hocGoogleMaps;
  }

  w.__hocGoogleMaps = new Promise<GoogleMapsApi>((resolve, reject) => {
    w.__hocGoogleMapsReady = () => {
      if (!w.google?.maps?.Map) {
        reject(new Error("Google Maps API unavailable"));
        return;
      }
      resolve(w.google.maps);
    };
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&callback=__hocGoogleMapsReady&v=weekly&loading=async&libraries=marker`;
    script.async = true;
    script.onerror = () => reject(new Error("Google Maps failed to load"));
    document.head.appendChild(script);
  });

  return w.__hocGoogleMaps;
}

export function createInteractiveGoogleMap(
  element: HTMLElement,
  maps: GoogleMapsApi,
  options: { center: GoogleLatLng; zoom: number; title: string },
): GoogleMapHandle {
  const greedy = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const map = new maps.Map(element, {
    center: options.center,
    zoom: options.zoom,
    mapId: "DEMO_MAP_ID",
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    zoomControl: true,
    gestureHandling: greedy ? "greedy" : "cooperative",
    scrollwheel: true,
    keyboardShortcuts: true,
    clickableIcons: false,
  });
  const AdvancedMarker = maps.marker?.AdvancedMarkerElement;
  const marker = AdvancedMarker
    ? new AdvancedMarker({
        position: options.center,
        map,
        title: options.title,
      })
    : new maps.Marker({
        position: options.center,
        map,
        title: options.title,
      });

  return {
    setCenter: (position) => map.setCenter(position),
    setZoom: (zoom) => map.setZoom(zoom),
    setMarker: (position, title) => {
      if ("setPosition" in marker) {
        marker.setPosition(position);
        marker.setTitle(title);
        return;
      }
      marker.position = position;
      marker.title = title;
    },
  };
}
