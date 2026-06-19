import { siteConfig } from "@/lib/site-config";

type ShareImageProps = {
  title: string;
  description: string;
  eyebrow: string;
};

export function ShareImage({ title, description, eyebrow }: ShareImageProps) {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        background: "#f5f5f4",
        color: "#1c1917",
        fontFamily: "Georgia, Times New Roman, serif",
        padding: "56px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          border: "1px solid #d6d3d1",
          background: "#ffffff",
          boxShadow: "0 24px 80px rgba(28, 25, 23, 0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "56px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 20,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#78716c",
            }}
          >
            {eyebrow}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                display: "flex",
                fontSize: 68,
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
              }}
            >
              {title}
            </div>
            <div
              style={{
                display: "flex",
                maxWidth: 760,
                fontFamily: "Arial, sans-serif",
                fontSize: 28,
                lineHeight: 1.45,
                color: "#57534e",
              }}
            >
              {description}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #e7e5e4",
              paddingTop: 28,
              fontFamily: "Arial, sans-serif",
              fontSize: 22,
              color: "#44403c",
            }}
          >
            <div style={{ display: "flex", fontWeight: 600 }}>{siteConfig.name}</div>
            <div style={{ display: "flex" }}>{siteConfig.url.replace("https://", "")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppIcon({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: "#1c1917",
        color: "#fafaf9",
        borderRadius: "22%",
        fontFamily: "Georgia, Times New Roman, serif",
        fontSize: 148,
        fontWeight: 700,
        letterSpacing: "-0.08em",
      }}
    >
      {label}
    </div>
  );
}
