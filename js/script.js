// Fetch IP address
fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('ip').textContent = `IP Address: ${data.ip}`;
        
        // Fetch location and ISP details using the IP
        return fetch(`http://ip-api.com/json/${data.ip}`);
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('location').textContent = `Location: ${data.city}, ${data.regionName}, ${data.country}`;
        document.getElementById('isp').textContent = `ISP: ${data.isp}`;
        document.getElementById('latitude').textContent = `Latitude: ${data.lat}`;
        document.getElementById('longitude').textContent = `Longitude: ${data.lon}`;
        
        // Show a map using the latitude and longitude
        const mapSrc = `https://www.google.com/maps/embed/v1/view?key=AIzaSyA-xer_E3mkeL3Z2YtOnS6u5tqDzpf5hLo&center=${data.lat},${data.lon}&zoom=14`;
        document.getElementById('map').innerHTML = `<iframe width="100%" height="100%" frameborder="0" style="border:0" src="${mapSrc}" allowfullscreen></iframe>`;
    });

// Detect Browser and Operating System
const browser = detectBrowser();
document.getElementById('browser').textContent = `Browser: ${browser.name} ${browser.version}`;
const os = detectOS();
document.getElementById('os').textContent = `Operating System: ${os}`;

// Browser Detection
function detectBrowser() {
    const ua = navigator.userAgent;
    let browserName, fullVersion;
    
    if ((verOffset = ua.indexOf("Chrome")) != -1) {
        browserName = "Chrome";
        fullVersion = ua.substring(verOffset + 7);
    } else if ((verOffset = ua.indexOf("Firefox")) != -1) {
        browserName = "Firefox";
        fullVersion = ua.substring(verOffset + 8);
    } else if ((verOffset = ua.indexOf("MSIE")) != -1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = ua.substring(verOffset + 5);
    } else if (ua.indexOf("Safari") != -1) {
        browserName = "Safari";
        if ((verOffset = ua.indexOf("Version")) != -1)
            fullVersion = ua.substring(verOffset + 8);
    } else if ((nameOffset = ua.lastIndexOf(' ') + 1) < (verOffset = ua.lastIndexOf('/'))) {
        browserName = ua.substring(nameOffset, verOffset);
        fullVersion = ua.substring(verOffset + 1);
    }

    return {
        name: browserName,
        version: fullVersion.split(' ')[0]
    };
}

// Operating System Detection
function detectOS() {
    const platform = navigator.platform.toLowerCase();
    if (platform.includes('win')) return 'Windows';
    if (platform.includes('mac')) return 'MacOS';
    if (platform.includes('linux')) return 'Linux';
    if (platform.includes('iphone') || platform.includes('ipad')) return 'iOS';
    if (platform.includes('android')) return 'Android';
    return 'Unknown OS';
}
