const input = document.getElementById('urlInput');
const button = document.querySelector('#browseForm button'); 
const iframe = document.getElementById('sandboxFrame');


button.addEventListener('click', () => {
  let url = input.value.trim();

  // Add https:// if user forgot it
  if (!/^https?:\/\//i.test(url)) {
    url = 'https://' + url;
  }
});

document.getElementById("browseForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Stop form reload

    const urlInput = document.getElementById("urlInput").value.trim();
    const iframe = document.getElementById("sandboxFrame");

    console.log("Form submitted, URL:", urlInput);

    if (!urlInput) {
        alert("Please enter a valid URL.");
        return;
    }

    // Show loading immediately
    iframe.srcdoc = "<p style='text-align:center;font-size:18px;color:white;'>Starting sandbox... please wait ⏳</p>";

    try {
        const response = await fetch("http://localhost:5000/api/sandbox", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ targetUrl: urlInput })
        });

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();
        console.log("Flask response:", data);

        // Show message based on response
        if (data.sessionUrl) {
            iframe.srcdoc = `<p style='text-align:center;font-size:18px;color:green;'>Sandbox started for ${urlInput}</p>`;
    
        } else {
            iframe.srcdoc = `<p style='text-align:center;font-size:18px;color:green;'>Sandbox started successfully!</p>`;
        }
    } catch (error) {
        console.error("Error launching sandbox:", error);
        iframe.srcdoc = "<p style='color:red;'>Server error. Make sure Flask is running and CORS is enabled.</p>";
    }
});
