import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site.config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #17191B 0%, #0E1011 70%)",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 72, height: 4, background: "#A77951" }} />
          <div
            style={{
              display: "flex",
              marginTop: 40,
              fontSize: 64,
              fontWeight: 600,
              color: "#F4F0E9",
              lineHeight: 1.1,
            }}
          >
            NorthPeak Developments
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 30, color: "#C9A07A" }}>
            &ldquo;{siteConfig.tagline}&rdquo;
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 22, color: "#C8C0B5" }}>
            Legal Suite Basements · Custom Basements · Home Renovation — Calgary &amp; Area
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
