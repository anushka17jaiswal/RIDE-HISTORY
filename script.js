let rides = JSON.parse(localStorage.getItem("rides")) || [];

const container = document.getElementById("rideContainer");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

function displayRides() {
    container.innerHTML = "";

    const searchText = searchInput.value.toLowerCase();
    const filterStatus = statusFilter.value;

    rides
        .filter(ride =>
            (ride.pickup.toLowerCase().includes(searchText) ||
             ride.drop.toLowerCase().includes(searchText)) &&
            (filterStatus === "All" || ride.status === filterStatus)
        )
        .forEach((ride, index) => {
            const card = document.createElement("div");
            card.className = "ride-card";

            card.innerHTML = `
                <p><strong>Date:</strong> ${ride.date}</p>
                <p><strong>Pickup:</strong> ${ride.pickup}</p>
                <p><strong>Drop:</strong> ${ride.drop}</p>
                <p><strong>Fare:</strong> ₹${ride.fare}</p>
                <p class="status ${ride.status.toLowerCase()}">${ride.status}</p>
                <button class="delete-btn" onclick="deleteRide(${index})">Delete</button>
            `;

            container.appendChild(card);
        });

    localStorage.setItem("rides", JSON.stringify(rides));
}


function addRide() {
    const date = document.getElementById("date").value;
    const pickup = document.getElementById("pickup").value;
    const drop = document.getElementById("drop").value;
    const fare = document.getElementById("fare").value;
    const status = document.getElementById("status").value;

    if (!date || !pickup || !drop || !fare) {
        alert("Please fill all fields");
        return;
    }

    const newRide = {
        date,
        pickup,
        drop,
        fare,
        status
    };

    rides.unshift(newRide);
    displayRides();

    
    document.getElementById("date").value = "";
    document.getElementById("pickup").value = "";
    document.getElementById("drop").value = "";
    document.getElementById("fare").value = "";
}


function deleteRide(index) {
    rides.splice(index, 1);
    displayRides();
}

searchInput.addEventListener("input", displayRides);
statusFilter.addEventListener("change", displayRides);

displayRides();
