document.addEventListener('DOMContentLoaded', () => {
    // Initialize all widgets
    initWeather();
    initImageWidget();
});

/**
 * Clock functionality is now initialized within initWeather after elements are created.
 */

/**
 * Weather Widget
 */
/**
 * Weather Widget
 */
/**
 * Weather Widget
 */
function initWeather() {
    const weatherWidget = document.getElementById('weather-widget');
    const lat = 55.6759; // Copenhagen latitude
    const lon = 12.5655; // Copenhagen longitude
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max,winddirection_10m_dominant&hourly=temperature_2m,weathercode,windspeed_10m,winddirection_10m&forecast_days=4&timezone=auto&windspeed_unit=ms`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            if (!data || !data.current_weather || !data.daily || !data.hourly) {
                weatherWidget.textContent = '天气数据不完整';
                return;
            }

            // --- MAIN WEATHER CONTENT (Current + 3-Day) --- //
            const current = data.current_weather;
            const currentTemp = Math.round(current.temperature);
            const currentWindSpeed = Math.round(current.windspeed);
            const currentWindDir = windDirection(current.winddirection);
            const currentWeatherCode = current.weathercode;

            let mainHtml = `<div class="main-weather-content">
                              <div class="current-weather-side">
                                <div class="weather-icon-large">${getWeatherIcon(currentWeatherCode)}</div>
                                <div class="temp-large">${currentTemp}°</div>
                                <div class="location-info">
                                    <div id="time"></div>
                                    <div id="date"></div>
                                    <div>哥本哈根</div>
                                    <div class="wind-info">${currentWindDir} ${currentWindSpeed} m/s</div>
                                </div>
                              </div>
                              <div class="forecast-side">`;
            for (let i = 1; i < 4; i++) {
                const day = data.daily;
                const date = new Date(day.time[i]);
                mainHtml += `<div class="forecast-day">
                                 <div>${getDayOfWeek(date)}</div>
                                 <div class="weather-icon-small">${getWeatherIcon(day.weathercode[i])}</div>
                                 <div>${Math.round(day.temperature_2m_max[i])}° / ${Math.round(day.temperature_2m_min[i])}°</div>
                             </div>`;
            }
            mainHtml += `</div></div>`;

            // --- HOURLY FORECAST CONTENT (Initially hidden) --- //
            let hourlyHtml = '<div class="hourly-forecast">';
            
            // Find the index of the first forecast hour that is at or after the current time
            let startIndex = -1;
            const currentTime = new Date(data.current_weather.time);
            for (let i = 0; i < data.hourly.time.length; i++) {
                if (new Date(data.hourly.time[i]) >= currentTime) {
                    startIndex = i;
                    break;
                }
            }

            if (startIndex !== -1) {
                for (let i = startIndex; i < startIndex + 8 && i < data.hourly.time.length; i++) {
                    const hour = data.hourly.time[i].slice(11, 13);
                    const temp = Math.round(data.hourly.temperature_2m[i]);
                    const weatherCode = data.hourly.weathercode[i];
                    const windSpeed = Math.round(data.hourly.windspeed_10m[i]);
                    const windDir = data.hourly.winddirection_10m[i];

                    hourlyHtml += `<div class="hourly-item">
                                     <div>${hour}:00</div>
                                     <div class="weather-icon-small">${getWeatherIcon(weatherCode)}</div>
                                     <div>${temp}°</div>
                                     <div class="hourly-wind">
                                        <span class="wind-arrow" style="transform: rotate(${windDir}deg)">↑</span>
                                        <span>${windSpeed}</span>
                                     </div>
                                 </div>`;
                }
            }
            hourlyHtml += '</div>';

            // Combine and set HTML
            weatherWidget.innerHTML = mainHtml + hourlyHtml;

            // --- START CLOCK --- //
            const timeEl = document.getElementById('time');
            const dateEl = document.getElementById('date');
        
            function updateClock() {
                const now = new Date();
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');
                timeEl.textContent = `${hours}:${minutes}:${seconds}`;
        
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()];
                dateEl.textContent = `${year}年${month}月${day}日 ${weekday}`;
            }
        
            updateClock();
            setInterval(updateClock, 1000);

            // Add click listener to toggle 'expanded' class
            weatherWidget.addEventListener('click', () => {
                weatherWidget.classList.toggle('expanded');
            });
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            weatherWidget.textContent = '无法加载天气';
        });
}

function getDayOfWeek(date) {
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return weekdays[date.getDay()];
}

function windDirection(degrees) {
    const directions = ['北', '东北', '东', '东南', '南', '西南', '西', '西北'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
}

function getWeatherIcon(code) {
    // Simple mapping from weather code to emoji
    if (code === 0) return '☀️'; // Clear sky
    if (code >= 1 && code <= 3) return '☁️'; // Mainly clear, partly cloudy, and overcast
    if (code >= 45 && code <= 48) return '🌫️'; // Fog
    if (code >= 51 && code <= 67) return '🌧️'; // Drizzle, Rain
    if (code >= 71 && code <= 77) return '❄️'; // Snow
    if (code >= 80 && code <= 82) return '🌦️'; // Rain showers
    if (code >= 95 && code <= 99) return '⛈️'; // Thunderstorm
    return '🌍'; // Default
}


/**
 * Background Image Slideshow Widget
 */
function initImageWidget() {
    const uploadBtn = document.getElementById('upload-btn');
    const imageUpload = document.getElementById('image-upload');
    const slideshowImage = document.getElementById('slideshow-image');

    let images = [];
    let currentImageIndex = 0;
    let slideshowInterval = null;

    // Set initial opacity to 0
    slideshowImage.style.opacity = 0;

    uploadBtn.addEventListener('click', () => imageUpload.click());

    imageUpload.addEventListener('change', (event) => {
        if (event.target.files.length === 0) return;

        // Clean up old object URLs to free memory
        images.forEach(URL.revokeObjectURL);
        images = Array.from(event.target.files).map(file => URL.createObjectURL(file));

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
            
            // Fade out
            slideshowImage.style.opacity = 0;

            // Wait for fade out to complete, then change image and fade in
            setTimeout(() => {
                slideshowImage.src = images[currentImageIndex];
                slideshowImage.style.opacity = 1;
                currentImageIndex = (currentImageIndex + 1) % images.length;
            }, 1000); // Must match the CSS transition duration
        }

        showNextImage(); // Show the first image immediately
        slideshowInterval = setInterval(showNextImage, 6000); // Change image every 6s (5s display + 1s fade)
    }
}
