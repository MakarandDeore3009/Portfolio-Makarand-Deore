async function updateVisitors() {

    try {

        const response = await fetch("/api/visitors");

        const data = await response.json();

        document.getElementById("visitor-count").textContent =
            data.visitors;

    } catch (error) {

        console.error(error);

        document.getElementById("visitor-count").textContent =
            "Unavailable";

    }

}

updateVisitors();