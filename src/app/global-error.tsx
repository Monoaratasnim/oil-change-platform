"use client";

export default function GlobalError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          background: "#07090c",
          color: "#f3f6f9",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          role="alert"
          style={{
            width: "100%",
            maxWidth: "28rem",
            textAlign: "center",
            padding: "2rem",
            borderRadius: "0.875rem",
            background: "#10151b",
            border: "1px solid #1f2833",
          }}
        >
          <h1 style={{ margin: "0 0 0.5rem", fontSize: "1.5rem" }}>
            Unexpected error
          </h1>
          <p style={{ margin: "0 0 1.5rem", color: "#98a3b3", fontSize: "0.9375rem" }}>
            Something went wrong at the application level. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              border: "none",
              borderRadius: "0.5rem",
              padding: "0.75rem 1.5rem",
              background: "#ff6b2c",
              color: "#160c04",
              fontSize: "0.9375rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}