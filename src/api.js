
export async function fetchWeather(number) {
    const response = await fetch(
        `https://www.jma.go.jp/bosai/forecast/data/overview_forecast/${number}.json`);
    const data = await response.json();
    console.log(data);
    return data;
}