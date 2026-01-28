export const fetchItems = async () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL_LOCAL || "http://localhost:3000";

  try {
    const res = await fetch(`${backendUrl}/api/items`, {
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch items: ${res.status} - ${text.substring(0, 100)}`);
    }

    return res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
