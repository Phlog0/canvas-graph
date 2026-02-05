export async function loadData() {
  try {
    const response = await fetch("./data.json"); // Path to your JSON file
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading JSON file:", error);
  }
}
