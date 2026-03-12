import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0b10 0%, #11131c 55%, #171a26 100%)",
          color: "#f5f0e6",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 56, letterSpacing: 2, marginBottom: 24 }}>SHUBIQ</div>
        <div style={{ fontSize: 30, lineHeight: 1.3, maxWidth: 900 }}>
          Intelligence That Wins. High-performance software, productivity apps, and digital platforms.
        </div>
        <div style={{ marginTop: 40, fontSize: 20, letterSpacing: 3, color: "#c6a45a" }}>SHUBIQ.COM</div>
      </div>
    ),
    size,
  )
}
