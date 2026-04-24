async function checkKey() {
    const key = "AIzaSyCbN0sewOnLQoXXKqk9lSbQubVlLkLtDcE";
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Response:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Fetch failed:", e);
    }
}
checkKey();
