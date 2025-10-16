document.addEventListener('DOMContentLoaded', function () {
    initWeather();
    initImageWidget();
});

function getWeatherIcon(code) {
    if (code === 0) return '☀️';
    if (code >= 1 && code <= 3) return '☁️';
    if (code >= 45 && code <= 48) return '🌫️';
    if (code >= 51 && code <= 67) return '🌧️';
    if (code >= 71 && code <= 77) return '❄️';
    if (code >= 80 && code <= 82) return '🌦️';
    if (code >= 95 && code <= 99) return '⛈️';
    return '🌍';
}

function getDayOfWeek(date) {
    var weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return weekdays[date.getDay()];
}

function windDirection(degrees) {
    var directions = ['北', '东北', '东', '东南', '南', '西南', '西', '西北'];
    var index = Math.round(degrees / 45) % 8;
    return directions[index];
}

function pad(num) {
    return num < 10 ? '0' + num : String(num);
}

function initWeather() {
    var weatherWidget = document.getElementById('weather-widget');
    var lat = 55.6759;
    var lon = 12.5655;
    var weatherUrl = 'https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max,winddirection_10m_dominant&hourly=temperature_2m,weathercode,windspeed_10m,winddirection_10m&forecast_days=4&timezone=auto&windspeed_unit=ms';
    var proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(weatherUrl);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', proxyUrl, true);
    xhr.timeout = 20000; // 20 seconds timeout

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 400) {
            var data = JSON.parse(xhr.responseText);

            if (!data || !data.current_weather || !data.daily || !data.hourly) {
                weatherWidget.textContent = '天气数据不完整';
                return;
            }

            var current = data.current_weather;
            var currentTemp = Math.round(current.temperature);
            var currentWindSpeed = Math.round(current.windspeed);
            var currentWindDir = windDirection(current.winddirection);
            var currentWeatherCode = current.weathercode;

            var mainHtml = '<div class="main-weather-content"><div class="current-weather-side"><div class="weather-icon-large">' + getWeatherIcon(currentWeatherCode) + '</div><div class="temp-large">' + currentTemp + '°</div><div class="location-info"><div id="time"></div><div id="date"></div><div>哥本哈根</div><div class="wind-info">' + currentWindDir + ' ' + currentWindSpeed + ' m/s</div></div></div><div class="forecast-side">';
            for (var i = 1; i < 4; i++) {
                var day = data.daily;
                var date = new Date(day.time[i]);
                mainHtml += '<div class="forecast-day"><div>' + getDayOfWeek(date) + '</div><div class="weather-icon-small">' + getWeatherIcon(day.weathercode[i]) + '</div><div>' + Math.round(day.temperature_2m_max[i]) + '° / ' + Math.round(day.temperature_2m_min[i]) + '°</div></div>';
            }
            mainHtml += '</div></div>';

            var hourlyHtml = '<div class="hourly-forecast">';
            var startIndex = -1;
            var currentTime = new Date(data.current_weather.time);
            for (var j = 0; j < data.hourly.time.length; j++) {
                if (new Date(data.hourly.time[j]) >= currentTime) {
                    startIndex = j;
                    break;
                }
            }

            if (startIndex !== -1) {
                for (var k = startIndex; k < startIndex + 8 && k < data.hourly.time.length; k++) {
                    var hour = data.hourly.time[k].slice(11, 13);
                    var temp = Math.round(data.hourly.temperature_2m[k]);
                    var weatherCode = data.hourly.weathercode[k];
                    var windSpeed = Math.round(data.hourly.windspeed_10m[k]);
                    var windDir = data.hourly.winddirection_10m[k];
                    hourlyHtml += '<div class="hourly-item"><div>' + hour + ':00</div><div class="weather-icon-small">' + getWeatherIcon(weatherCode) + '</div><div>' + temp + '°</div><div class="hourly-wind"><span class="wind-arrow" style="-webkit-transform: rotate(' + windDir + 'deg); transform: rotate(' + windDir + 'deg);">↓</span><span>' + windSpeed + '</span></div></div>';
                }
            }
            hourlyHtml += '</div>';

            weatherWidget.innerHTML = mainHtml + hourlyHtml;

            var timeEl = document.getElementById('time');
            var dateEl = document.getElementById('date');
            function updateClock() {
                var now = new Date();
                timeEl.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
                dateEl.textContent = now.getFullYear() + '年' + pad(now.getMonth() + 1) + '月' + pad(now.getDate()) + '日 ' + getDayOfWeek(now);
            }
            updateClock();
            setInterval(updateClock, 1000);

            weatherWidget.addEventListener('click', function () {
                if (weatherWidget.classList.contains('expanded')) {
                    weatherWidget.classList.remove('expanded');
                } else {
                    weatherWidget.classList.add('expanded');
                }
            });
        } else {
            weatherWidget.textContent = '无法加载天气';
        }
    };
    xhr.onerror = function () {
        weatherWidget.textContent = '网络错误';
    };
    xhr.ontimeout = function () {
        weatherWidget.textContent = '网络超时，请刷新';
    };
    xhr.send();
}

function initImageWidget() {
    var uploadBtn = document.getElementById('upload-btn');
    var imageUpload = document.getElementById('image-upload');
    var slideshowImage = document.getElementById('slideshow-image');
    var images = [];
    var currentImageIndex = 0;
    var slideshowInterval = null;

    slideshowImage.style.opacity = 0;

    uploadBtn.addEventListener('click', function () {
        imageUpload.click();
    });

    imageUpload.addEventListener('change', function (event) {
        if (event.target.files.length === 0) return;

        images.forEach(function(imgUrl) { URL.revokeObjectURL(imgUrl); });
        images = [];

        for (var i = 0; i < event.target.files.length; i++) {
            images.push(URL.createObjectURL(event.target.files[i]));
        }

        if (images.length > 0) {
            currentImageIndex = 0;
            startSlideshow();
        }
    });

    function startSlideshow() {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
        }

        function showNextImage() {
            if (images.length === 0) return;
            slideshowImage.style.opacity = 0;
            setTimeout(function () {
                slideshowImage.src = images[currentImageIndex];
                slideshowImage.style.opacity = 1;
                currentImageIndex = (currentImageIndex + 1) % images.length;
            }, 1000);
        }

        showNextImage();
        slideshowInterval = setInterval(showNextImage, 6000);
    }
}