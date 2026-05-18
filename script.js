const container = document.getElementById("rideContainer");

async function displayRides() {

    const response = await fetch("http://localhost:3000/rides");

    const rides = await response.json();

    container.innerHTML = "";

    rides.forEach((ride) => {

        const card = document.createElement("div");

        card.className = "ride-card";

        card.innerHTML = `
            <p><strong>Date:</strong> ${ride.ride_date}</p>
            <p><strong>Pickup:</strong> ${ride.pickup_location}</p>
            <p><strong>Drop:</strong> ${ride.drop_location}</p>
            <p><strong>Fare:</strong> ₹${ride.fare}</p>

            <p class="status ${ride.status.toLowerCase()}">
                ${ride.status}
            </p>

            <button class="delete-btn"
                onclick="deleteRide(${ride.id})">
                Delete
            </button>
        `;

        container.appendChild(card);
    });
}

async function addRide() {

    const date = document.getElementById("date").value;
    const pickup = document.getElementById("pickup").value;
    const drop = document.getElementById("drop").value;
    const fare = document.getElementById("fare").value;
    const status = document.getElementById("status").value;

    if (!date || !pickup || !drop || !fare) {
        alert("Please fill all fields");
        return;
    }

    await fetch("http://localhost:3000/addRide", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            date,
            pickup,
            drop,
            fare,
            status
        })
    });

    displayRides();

    document.getElementById("date").value = "";
    document.getElementById("pickup").value = "";
    document.getElementById("drop").value = "";
    document.getElementById("fare").value = "";
}

async function deleteRide(id) {

    await fetch(`http://localhost:3000/deleteRide/${id}`, {
        method: "DELETE"
    });

    displayRides();
}

displayRides();
