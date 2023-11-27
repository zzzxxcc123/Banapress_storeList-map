async function fetchData() {
    try {
        const response = await fetch('http://localhost:9090/'); // Replace with your server URL
        const data = await response.json();
        console.log(data);
        displayData(data)

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call fetchData when the page loads
// window.onload = fetchData;


function displayData(data) {
    const container = document.getElementById('informationContainer');

    // Assuming 'data' is an array of information objects
    data.forEach(info => {
        const infoElement = document.createElement('div');
        infoElement.className = 'informationItem';
        infoElement.innerHTML = `<img src="./banapress/${info.name}.jpg" alt="Image"><div><p><b>매점 이름:</b></p> <p>${info.name}</p><p><b>주소:</b><p> ${info.address}</p></div>`;
        container.appendChild(infoElement);
        if (info.address) {
            getAddress(info.address, info.name, map);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    fetchData();
});


// kakao map
// 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
var mapContainer = document.getElementById('map');
var mapOption = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 6
};
var map = new kakao.maps.Map(mapContainer, mapOption);

function getAddress(address, name, map){
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            var marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });
            var infowindow = new kakao.maps.InfoWindow({
                content: `<div style="width:150px;text-align:center;padding:6px 0;">${name}</div>`
            });

            kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
            kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
        }
        map.setCenter(coords);
    });
}

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다 
function makeOverListener(map, marker, infowindow) {
    return function() {
        infowindow.open(map, marker);
    };
}

// 인포윈도우를 닫는 클로저를 만드는 함수입니다 
function makeOutListener(infowindow) {
    return function() {
        infowindow.close();
    };
}