let btn = document.querySelector('button');

btn.addEventListener('click', getlocation);

function getlocation(e) {
    // console.log(location);
    if (navigator.geolocation) {
        btn.innerText = "please detect your location"
        navigator.geolocation.getCurrentPosition(onsuccess, onerror)
    }
    else {
        btn.innerText = "your browser dosen't support location"
    }
}
function onsuccess(e) {
    // console.log(e);
    let { latitude, longitude } = e.coords;
    // console.log(latitude,longitude);
    let apikey = '92c56d24d0f74ceabb7619fb195e6f17'
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${apikey}`)
        .then(response => {
            return response.json();
            // console.log(response.json());
        })
        .then(response => {
            // console.log(response.results[0].components);
            let allDetails = response.results[0].components;
            // console.log(allDetails);
            let { county, country } = allDetails;
            btn.innerText = `${county}, ${country}`;

        }).catch(() => {
            btn.innerText = "Opp! Something Wrong please try again";
        })
}
function onerror(err) {
    if (err.code === 1) {
        btn.innerText = "You denie d the request"
    }
    else if (err.code === 2) {
        ntn.innerText = "Location is unavailable"
    }
    else {
        btn.innerText = "Opp! Something Wrong please try again";
    }
    btn.setAttribute('disabled', true)
}