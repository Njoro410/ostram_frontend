import React, { useState } from "react";
import { useGetWeatherDataQuery } from "../app/api/weatherSlice";
import { Box, Typography } from "@mui/material";
import Sunny from "../assets/weather/sunny.jpg";
import Rainy from "../assets/weather/rainy.jpg";
import Cloudy from "../assets/weather/cloudy.jpg";
import Partly from "../assets/weather/partly-cloudy.jpg";
import FlexBetween from "./FlexBetween";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WeatherData = ({ location }) => {
  const {
    data: weather,
    isLoading,
    isError,
    error,
  } = useGetWeatherDataQuery(location);

  const getImageUrl = () => {
    if (weather && weather?.current.condition.code) {
      const weatherCondition = weather?.current.condition.code;

      switch (weatherCondition) {
        case 1000:
          return Sunny;
        case 1063 ||
          1180 ||
          1183 ||
          1186 ||
          1189 ||
          1192 ||
          1195 ||
          1198 ||
          1201 ||
          1276 ||
          1273 ||
          1264 ||
          1240 ||
          1261:
          return Rainy;
        case 1006 || 1009 || 1030 || 1135:
          return Cloudy;
        case 1003:
          return Partly;

        default:
          return null;
      }
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const imageUrl = getImageUrl();
  const forecastWeather = weather?.forecast?.forecastday[0].hour.map(
    (time) => time
  );

  function filterForecastWeather(forecastWeather) {
    if (!forecastWeather || !Array.isArray(forecastWeather)) {
      return [];
    }

    const currentTimestamp = Date.now();

    return forecastWeather.filter((item) => {
      const itemTimestamp = new Date(item.time).getTime();
      return itemTimestamp > currentTimestamp;
    });
  }

  // console.log(filterForecastWeather(forecastWeather));

  function getForecastWeatherCode(forecastWeather) {
    if (!forecastWeather || !Array.isArray(forecastWeather)) {
      return [];
    }
    return forecastWeather.map((weath) => weath.condition.code);
  }

  // console.log(getForecastWeatherCode(forecastWeather))

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      {imageUrl && (
        <Box
          component="img"
          sx={{
            width: "100%",
            height: "18.1rem",
            objectFit: "cover",
            opacity: 0.5,
            filter: `blur(1px)`,
          }}
          src={imageUrl}
          alt={weather?.location.name}
        />
      )}
      <Box
        sx={{
          position: "absolute",
          zIndex: 1,
          top: 0,
          left: 0,
          width: "100%",
          padding: "1rem",
        }}
      >
        <Box>
          <Typography
            variant="h2"
            sx={{
              fontSize: "3rem",
            }}
          >
            {weather?.location.name}
          </Typography>
        </Box>
        <FlexBetween sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src={weather?.current.condition.icon}
              alt={weather?.location.name}
            />
            <Typography
              variant="h2"
              sx={{
                fontSize: "1.5rem",
              }}
            >
              {weather?.current.condition.text}
            </Typography>
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontSize: "1.5rem",
              px: "1rem",
            }}
          >
            {weather?.current.temp_c}&#176;C
          </Typography>
        </FlexBetween>
        <Box>
          <Slider {...settings}>
            {filterForecastWeather(forecastWeather).map((hour) => (
              <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f1f1f1',
                color: '#333',
              }}
                key={hour.time_epoch}
              >
                {hour.condition.text} {hour.time}
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
    </Box>
  );
};

export default WeatherData;
